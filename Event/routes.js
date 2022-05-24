const router = require('express').Router()
const { getEvent, createEvent, updateEvent, deleteEvent, searchEvents, registerForEvent, generateLink, trendingEvents } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createEventSchema } = require('../Utils/validation')

router.get('/get/event', getEvent)
router.post('/create', validator.body(createEventSchema),createEvent)
router.patch('/update', updateEvent)
router.delete('/delete', deleteEvent)
router.get('/search', searchEvents)
router.patch('/register', registerForEvent)
router.get('/link', generateLink)
router.get('/trending', trendingEvents)

module.exports=router;
