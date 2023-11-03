//Two types of errors : Programmer error due to programmer and then there is Operational errors that is cause of some operation failure (like when we interact with databae and some operation like a get request fails)
class ErrorHandler extends Error{
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports= ErrorHandler