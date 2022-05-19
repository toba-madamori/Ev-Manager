const router = require('express').Router()
const passport = require('passport')
// const authenticator  = require('../Middleware/authentication')
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    confirmRegistration,
    passportGoogle
} = require('./controllers')

router.post('/register', register) 
router.patch('/confirm-registration/:id/:token', confirmRegistration)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:id/:token', resetPassword)
router.patch('/change-password', changePassword) 
router.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] })) // will lead to google Oauth screens
router.get('/google-redirect-url', passport.authenticate('google'), passportGoogle)

module.exports = router;