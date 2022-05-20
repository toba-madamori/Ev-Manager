const router = require('express').Router()
const { updateProfile, rateUser } = require('./controllers')

router.patch('/update', updateProfile)
router.patch('/rate', rateUser)

module.exports = router;
