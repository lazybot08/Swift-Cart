const User = require('../models/userModel')
const sendToken = require('../utils/sendToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('../cloudinary/cloudinary')
const catchAsyncError = require('../middlewares/catchAsyncError')
const ErrorHandler = require('../utils/errorHandler');
//-- Create a New User 
exports.registerUser = catchAsyncError(async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name, email, password,
    })
    sendToken(user, 201, res)
})

//-- Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    //The user entered the email and password in the login form and this data will be sent in req.body
    const { email, password } = req.body
    //Now check if user has entered both email and password in the login form otherwise show the error
    if (!email || !password) {
        return next(new ErrorHandler(400, "Please enter Email and Password"))
    }
    const user = await User.findOne({ email: email }).select("+password")
    //now check if the user exist or not
    if (!user) {
        return next(new ErrorHandler(401, "Invalid Email or Password"))
    }
    //now time to check if the entered password is correct
    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new ErrorHandler(401, "Invalid Email or Password"))
    }
    //finally if everything goes well then give a JWT token to the user 
    sendToken(user, 200, res)
})

//-- Logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})

//-- forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    //find the user with email entered by user to reset password
    const user = await User.findOne({ email:req.body.email })
    //if user is not found throw an error
    if (!user) {
        return next(new ErrorHandler(404, "User with this email is not found"))
    }
    //But if the user is found then prepare the token based reset password url to send via nodemailer
    const resetToken = user.getResetPasswordToken()
    //after calling the above function the resetPasswordToken & resetPasswordExpire is created inside user schema and the resetToken is returned by the function
    //but we need to save the user document in the database with this new schema field updates
    await user.save({ validateBeforeSave: false })  //validate  before save is going to skip pre save hook execution. Otherwise the next() middleware will run  
    //prepare an email message 
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`
    const emailMessage = `Hello, ${user.name}, 
     Your reset Password token is: ${resetPasswordUrl} 
     Please do not share it with anyone. It is only valid for 15 min`
    //now we will send the mail to the user using nodemailer
    try {
        await sendEmail({
            email: user.email,
            subject: "User Password Recovery",
            message: emailMessage
        })
        res.status(200).json({
            success: true,
            message: `Email for user password recovery sent successfully to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(500, error.message))
    }
})
//-- method to reset password: After user gets the reset password token user will use it to reset password. So let us define the logic
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    //now first of all we need to find the user with the help of resetPasswordToken generated for that user. It is stored in database in hashed form so we also have to hash it before matching it
    const resetToken = req.params.resetToken
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    //now find user on basis of the hashed token matched but also the expiry time should be more than the current time as it is only going to be valid for 15 minutes
    const user = await User.findOne({ resetPasswordToken: hashedResetToken, resetPasswordExpire: { $gt: Date.now() } })
    if (!user) {
        return next(new ErrorHandler(404, "Reset password token has expired or is invalid"))
    }
    //now match if the new password and confirm new password both are same
    if (req.body.newPassword !== req.body.confirmNewPassword) {
        return next(new ErrorHandler(404, "new password and confirm new password must match"))
    }
    user.password = req.body.newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()     //now we will not assign {validateBeforeSave: false} because here we want to hash the new password before saving into Database and hence we will not avoid pre save hook execution
    //now login after resetting user password
    sendToken(user, 200, res)
})


//-- get user details method
exports.getUserDetails = catchAsyncError(async (req, res) => {
    //we will get this req.user.id after authentication check with the help of isUserAuthenticated middleware defined in auth.js
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})

//uploading user avatar or updating it
exports.uploadAvatar = catchAsyncError(async (req, res, next) => {
    const { image } = req.body
    const avatarUploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'user_avatar_upload',
        allowed_formats: ['png', 'jpg', 'jpeg']
    })
    try {
        req.upload_response = avatarUploadResponse
        next()
    } catch (error) {
        res.json(error)
    }
})
//uploading avatar to database
exports.uploadAvatarToDB = catchAsyncError(async (req, res) => {
    const { public_id, url } = req.upload_response
    console.log(req.upload_response)
    if(req.user.avtar.public_id !== ''){
        const cloudRes =  await cloudinary.uploader.destroy(req.user.avtar.public_id)
    }
    const user = await User.findByIdAndUpdate(req.user.id, {$set: {
        avtar: {
            public_id: public_id,
            url: url
        }
    }}, {new: true})
    res.status(200).json({
        success: true,
        avtar: user.avtar
    })
})
//get the profile image from database
exports.getProfileImage = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user.id)
    cloudinary.api.resource(user.avtar.public_id).then(() => {
        res.json({
            success: true,
            avtar: user.avtar
        })
    }).catch(async (error) => {
        res.json({
            success: false,
            error:  error.message
        })
    })
})

//-- update password method. It is different from reset password in which you are not logged in to your account but in case of update you are logged in to your account
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")
    //older password in database must match the oldPassword entered by the user
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if (!isPasswordMatched) {
        return next(new ErrorHandler(404, "Invalid password entered"))
    }
    //now user's old password must not match the new password
    if (req.body.oldPassword === req.body.newPassword) {
        return next(new ErrorHandler(404, "New password must be different from previous password"))
    }
    //now match if the new password and confirm new password both are same
    if (req.body.newPassword !== req.body.confirmNewPassword) {
        return next(new ErrorHandler(404, "new password and confirm new password must match"))
    }
    user.password = req.body.newPassword
    await user.save()
    sendToken(user, 200, res)
})

//-- update profile method: to update other profile values except password
exports.updateProfile = catchAsyncError(async (req, res) => {
    const userNewData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, userNewData, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        user
    })
})

//-- method to get all users -- ADMIN ONLY
exports.getAllUsers = catchAsyncError(async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
})

//-- method to update user by ID  -- ADMIN ONLY
exports.getUserByID = catchAsyncError(async (req, res, next) => {
    const user = await User.find({ _id: req.params.id })
    if (!user) {
        return next(new ErrorHandler(404, "User with this id does not exist"))
    }
    res.status(200).json({
        success: true,
        user
    })
})

//-- method to update user role -- ADMIN ONLY
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const userNewData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, userNewData, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return next(new ErrorHandler(404, "User with this id does not exist"))
    }
    res.status(200).json({
        success: true,
        user
    })
})

//-- method to delete user -- ADMIN ONLY
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(404, "User with this id does not exist"))
    }
    await user.remove()
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})