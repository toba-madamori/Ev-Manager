const router = require('express').Router()
const { updateProfile, rateUser, getProfile, getEventHostProfile} = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { profileUpdateSchema, ratingSchema } = require('../Utils/validation')
const authMiddleware = require('../Middleware/authentication')

router.get('/get-profile',authMiddleware, getProfile)
router.get('/get-host-profile/:id', getEventHostProfile)
router.patch('/update/:id',authMiddleware, validator.body(profileUpdateSchema), updateProfile)
router.patch('/rate/:id',validator.query(ratingSchema), rateUser)

module.exports = router;
