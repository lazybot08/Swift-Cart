const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken()
    const cookieOptions = {
        expires: new Date(
            Date.now() + (process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }
    //we will only send the name and email of the user because we want to persist user without storing the sensitive details in the browser's local storage.
    const {_id, avtar, password, role, ...other} = user._doc
    res.status(statusCode).cookie('token', token, cookieOptions).json({
        success: true,
        user: other
    })
}

module.exports=sendToken