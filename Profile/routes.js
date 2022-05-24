const router = require('express').Router()
const { updateProfile, rateUser, getProfile } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { profileUpdateSchema, ratingSchema } = require('../Utils/validation')

router.get('/get-profile', getProfile)
router.patch('/update/:id',validator.body(profileUpdateSchema), updateProfile)
router.patch('/rate/:id',validator.query(ratingSchema), rateUser)

module.exports = router;
