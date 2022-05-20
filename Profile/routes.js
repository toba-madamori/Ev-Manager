const router = require('express').Router()
const { updateProfile, rateUser, getProfile } = require('./controllers')

router.get('/get-profile', getProfile)
router.patch('/update/:id', updateProfile)
router.patch('/rate', rateUser)

module.exports = router;
