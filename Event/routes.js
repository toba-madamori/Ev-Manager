const router = require('express').Router()
const { getEvent, createEvent, updateEvent, deleteEvent, searchEvents, registerForEvent, verifyEventToken, trendingEvents, getAllEvents, getEventHostee} = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createEventSchema, idValidator, updateEventSchema, getEventValidator, optionalIdValidator } = require('../Utils/validation')
const authMiddleware = require('../Middleware/authentication')

router.get('/get/event/:id',authMiddleware, validator.params(idValidator), getEvent)
router.get('/get/all/events', authMiddleware,validator.query(getEventValidator), getAllEvents)
router.post('/create', authMiddleware, validator.body(createEventSchema), createEvent)
router.patch('/update/:id',authMiddleware,validator.params(idValidator),validator.body(updateEventSchema), updateEvent)
router.delete('/delete/:id',authMiddleware,validator.params(idValidator), deleteEvent)
router.get('/search',validator.query(getEventValidator), searchEvents)
router.patch('/register', registerForEvent)
router.get('/link', verifyEventToken)
router.get('/trending',validator.query(getEventValidator), trendingEvents)
router.get('/get-event/:id?',validator.params(optionalIdValidator), validator.query(getEventValidator), getEventHostee)

module.exports=router;
