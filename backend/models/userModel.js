const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is a required field"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is a required field"],
        unique: [true, "User with this email already exists"],
        validate: [validator.isEmail, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Password is a required field"],
        minLength: [8, "Password must be atleast 8 characters long"],
        select: true     //this will help us in including or excluding the password field using + or - prefix along with the name of "password" field inside select() method 
    },
    avtar: {
        //we will get a public_id of image when we upload it on cloud
        public_id: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    role: {
        type: String,
        default: "user"     
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
})

//now to encrypt password we will use pre Save Middleware hooks in mongoose. These hooks ties a lifecycle method with a pre save middleware function. lifecycle methods are pre and post which represents pre-save and post-save 
//pre save middleware function will run before saving a document
userSchema.pre("save", async function(next){
    //As we know that pre save middleware function will run everytime the particular document is saved in the users collection on Ecommerce database
    //So if we updated our profile-picture or name or email and not changed the password but when these changes will be saved then the pre save middleware function will run and again a new hash will be generated everytime
    //Hence if password is not modified call next()
    if(!this.isModified("password")){
        next()
    }
    //So we only change the hash if password is modified
    this.password = await bcrypt.hash(this.password, 10)
})

//It's time to generate a JWT Token for the authorisation purpose
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY)
}

//method to compare the password entered by the user with the password in the DB
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//-- method to generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //generate a reset password token
    const resetToken = crypto.randomBytes(20).toString('hex')
    //Now hash it before storing this reset token in user schema. To hash it we will use 'sha256' hashing algorithm. We will store it in the hashed form in database
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    //Now store it in user schema in resetPasswordToken field
    this.resetPasswordToken = hashedResetToken
    //Also we will set it's expire time as 15 minutes
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken
}


module.exports= mongoose.model("User", userSchema)