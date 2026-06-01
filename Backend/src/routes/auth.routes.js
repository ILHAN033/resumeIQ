const express = require('express')
const authController = require('../controller/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const authRouter = express.Router()

authRouter.post('/register',authController.userRegistertionController)
authRouter.post('/login',authController.userLoginController)
authRouter.get('/logout',authController.userLogoutController)
authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController)

module.exports = authRouter