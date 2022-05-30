const router = require('express').Router()
const { getEvent, createEvent, updateEvent, deleteEvent, searchEvents, registerForEvent, generateLink, trendingEvents, getAllEvents} = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createEventSchema, idValidator, updateEventSchema } = require('../Utils/validation')
const authMiddleware = require('../Middleware/authentication')

router.get('/get/event/:id',authMiddleware, validator.params(idValidator), getEvent)
router.get('/get/all/events', authMiddleware, getAllEvents)
router.post('/create', authMiddleware, validator.body(createEventSchema), createEvent)
router.patch('/update/:id',authMiddleware,validator.params(idValidator),validator.body(updateEventSchema), updateEvent)
router.delete('/delete', deleteEvent)
router.get('/search', searchEvents)
router.patch('/register', registerForEvent)
router.get('/link', generateLink)
router.get('/trending', trendingEvents)

module.exports=router;
