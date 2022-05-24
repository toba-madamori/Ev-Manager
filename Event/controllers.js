const { StatusCodes } = require('http-status-codes')
const { createEventValidator } = require('../Utils/validation')
const { BadRequestError } = require('../Errors')
const { Event } = require('./model')
const { eventRegistrationToken } = require('../Utils/tokens')


const getEvent = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"get a particular event" })
}

const createEvent = async(req,res)=>{
    const { error } = createEventValidator.validate({...req.body})
    if(error) throw new BadRequestError(error.message)

    const { userID } = req.user
    req.body.userid = userID
    
    const event = await Event.create({...req.body})
    const regToken = await eventRegistrationToken(event._id)

    res.status(StatusCodes.CREATED).json({ event, regToken })
}

const updateEvent = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"update event" })
}

const deleteEvent = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"delete event" })
}

const searchEvents = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"search for events" })
}

const trendingEvents = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"list of trending events" })
}

const registerForEvent = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"register for event" })
}

const generateLink = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"generate link for event" })
}


module.exports={
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvents,
    registerForEvent,
    generateLink,
    trendingEvents
}
