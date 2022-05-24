const router = require('express').Router()
const passport = require('passport')
const authentication  = require('../Middleware/authentication')
const validator = require('express-joi-validation').createValidator({})
const { registerSchema, loginSchema, forgotPasswordSchema, changePasswordSchema,idValidator } = require('../Utils/validation')
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    confirmRegistration,
    passportGoogle
} = require('./controllers')

router.post('/register',validator.body(registerSchema), register) 
router.patch('/confirm-registration/:id/:token',validator.params(idValidator), confirmRegistration)
router.post('/login',validator.body(loginSchema), login)
router.post('/forgot-password',validator.body(forgotPasswordSchema), forgotPassword)
router.post('/reset-password/:id/:token',validator.params(idValidator), resetPassword)
router.patch('/change-password',authentication,validator.body(changePasswordSchema),  changePassword) 
router.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] })) // will lead to google Oauth screens
router.get('/google-redirect-url', passport.authenticate('google'), passportGoogle)

module.exports = router;