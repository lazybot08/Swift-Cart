const ErrorHandler = require('../utils/errorHandler')

//Here error is an object of the ErrorHandler class.
//because we have called error middleware and passed "new ErrorHandler(500, "Product not found")" through next() function 
//Hence passing it to error object as a function parameter is same as creating an error object like:
// const error = new ErrorHandler(500, "Product not found") 
module.exports = (error, req, res, next)=>{
    error.statusCode = error.statusCode || 500                    //if we do not pass any status code to ErrorHandler class then by default it will be taken as 500
    error.message = error.message || "Internal server Error"         //if message not given then default message will be 

    //mongoose duplicate key error: we get an error with error code 11000 in such case
    if(error.code === 11000){
        const message = `User with this ${Object.keys(error.keyValue)} already exists. Choose a different ${Object.keys(error.keyValue)}`
        error = new ErrorHandler(404, message)
    }

    res.status(error.statusCode).json({
        success: false,
        error: error.message
    })
}