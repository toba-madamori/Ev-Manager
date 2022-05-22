const router = require('express').Router()
const { updateProfile, rateUser, getProfile } = require('./controllers')

router.get('/get-profile/:id', getProfile)
router.patch('/update/:id', updateProfile)
router.patch('/rate/:id', rateUser)

module.exports = router;
