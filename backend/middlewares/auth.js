const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")
const User = require('../models/userModel')
//THIS IS A AUTHORISATION MIDDLEWARE. IT WILL VERIFY THE USER BASED ON JWT TOKEN PROVIDED TO THE USER
exports.isUserAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    //now if token value is null then user is not authorised to access this resource
    if (!token) {
        return next(new ErrorHandler(401, "You are not authorised to access this resource. Please login"))
    }

    //now if we get a token then we need to verify the token before giving the access to the resource because the token may be changed by the user
    //once the jwt token is verified it returns the decoded data
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
    //now decoded data refer to the data of the user who is logged in and has a valid token
    //decoded data will be according to the corresponding token 
    //so now we can store the decoded data in req.user so until the user is logged in we can access this data till then
    req.user = await User.findById(decodedData.id)
    next()
}

exports.authoriseRoles = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            next(new ErrorHandler(403, `${req.user.role} is not authorised for accessing this resource`))
        }
        next()
    }
}