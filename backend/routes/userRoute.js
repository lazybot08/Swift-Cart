const express = require('express')
const userRouter = express.Router()
const { registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getUserByID,
    updateUserRole,
    deleteUser, 
    uploadAvatar,
    uploadAvatarToDB,
    getProfileImage} = require('../controllers/userController')
const { isUserAuthenticated, authoriseRoles } = require('../middlewares/auth')

userRouter.post('/registerUser', registerUser)
userRouter.post('/loginUser', loginUser)
userRouter.get('/profile', isUserAuthenticated, getUserDetails)
userRouter.post('/profile/uploadAvatar', isUserAuthenticated, uploadAvatar, uploadAvatarToDB)
userRouter.get('/profile/getProfileImage', isUserAuthenticated, getProfileImage)
userRouter.put('/profile/update', isUserAuthenticated, updateProfile)
userRouter.put('/password/updatePassword', isUserAuthenticated, updatePassword)
userRouter.post('/password/forgotPassword', forgotPassword)
userRouter.put('/password/resetPassword/:resetToken', resetPassword)
userRouter.get('/logoutUser', logoutUser)
userRouter.get('/admin/users', isUserAuthenticated, authoriseRoles("admin"), getAllUsers)    //-- admin only
userRouter.get('/admin/users/:id', isUserAuthenticated, authoriseRoles("admin"), getUserByID)   //-- admin only
userRouter.put('/admin/users/update/:id', isUserAuthenticated, authoriseRoles("admin"), updateUserRole)   //-- admin only
userRouter.delete('/admin/users/delete/:id', isUserAuthenticated, authoriseRoles("admin"), deleteUser)   //-- admin only
module.exports = userRouter