const router = require('express').Router()
const { updateProfile, rateUser, getProfile, getEventHostProfile} = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { profileUpdateSchema, ratingSchema, idValidator } = require('../Utils/validation')
const authMiddleware = require('../Middleware/authentication')

router.get('/get-profile',authMiddleware, getProfile)
router.get('/get-host-profile/:id',validator.params(idValidator), getEventHostProfile)
router.patch('/update/:id',authMiddleware, validator.body(profileUpdateSchema),validator.params(idValidator), updateProfile)
router.patch('/rate/:id',validator.query(ratingSchema),validator.params(idValidator), rateUser)

module.exports = router;
