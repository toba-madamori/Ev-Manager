const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../Errors')
const { Event, Link } = require('./model')
const { eventRegistrationToken, verifyEventRegistrationToken } = require('../Utils/tokens')
const { userValidator } = require('../Utils/event')


// get a particular event : host/user
const getEvent = async(req,res)=>{
    const { id:eventID } = req.params

    const event = await Event.findById({ _id:eventID })
    const token = await Link.findOne({ eventid:eventID }).select('reg_token -_id')
    res.status(StatusCodes.OK).json({ event, token })
}

// get all events created by a particular host/user: for users to view all the events theyve created
// will add pagination 
const getAllEvents = async(req,res)=>{
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;
    const skip = (page - 1)*limit;

    const events = await Event.find({ userid:req.user.userID }).select('_id name').skip(skip).limit(limit)
    res.status(StatusCodes.OK).json({ events, nbhits:events.length })
}

const createEvent = async(req,res)=>{
    const { userID } = req.user
    req.body.userid = userID
    
    const event = await Event.create({...req.body})
    const regToken = await eventRegistrationToken(event._id)
    await Link.create({userid:userID, eventid:event._id, reg_token:regToken })

    res.status(StatusCodes.CREATED).json({ event, regToken })
}

const updateEvent = async(req,res)=>{
    const { id:eventID } = req.params
    const { userID } = req.user
    
    const event = await Event.findById({ _id:eventID })
    if(!event) throw new NotFoundError("sorry this event doesn't exist")
    await userValidator(event.userid, userID)

    const update = { ...req.body }
    const updatedEvent = await Event.findByIdAndUpdate({ _id:eventID }, update, { new:true })

    res.status(StatusCodes.OK).json({ updatedEvent })
}

const deleteEvent = async(req,res)=>{
    const { id:eventID } = req.params
    const { userID } = req.user

    const event = await Event.findById({ _id:eventID })
    await userValidator(event.userid, userID)

    Promise.all([Event.findByIdAndDelete({ _id:eventID }), Link.findOneAndDelete({ eventid:eventID })])

    res.status(StatusCodes.OK).json({ msg:"success" })
}

const searchEvents = async(req,res)=>{
    let { tags } = req.query

    tags = tags.split(',')
    const queryObject = {}
    if(tags){
        queryObject.tags = {"$in": tags}
    }
    queryObject.event_type = 'Public'

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;
    const skip = (page - 1)*limit;

    const events = await Event.find(queryObject).select('_id name').skip(skip).limit(limit)
    res.status(StatusCodes.OK).json({ events, nbhits:events.length })
}

const trendingEvents = async(req,res)=>{
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;
    const skip = (page - 1)*limit;

    const events = await Event.find({event_type:'Public'}).sort({ num_reg_hostees:-1}).select('_id name').skip(skip).limit(limit)
    res.status(StatusCodes.OK).json({ events, nbhits:events.length })
}

const registerForEvent = async(req,res)=>{
    const { additional_activities} = req.body
    const { id:eventID } = req.params

    const event = await Event.findByIdAndUpdate({_id:eventID}, {$inc:{'num_reg_hostees':1}})
    let event_fee = event.event_fee
    let additional_activities_fee = 0
    if(additional_activities){
        for(const item of additional_activities){
            additional_activities_fee += item.price
        }
    }
    const total_fee = event_fee + additional_activities_fee

    res.status(StatusCodes.OK).json({ status:"success", ticket:{event_name:event.name, event_id:event._id, event_fee, additional_activities_fee, total_fee, status:"registered"} })
}

const verifyEventToken = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"generate link for event" })
}

// from here they can register for the event...event id will be gotten after token verification
// token will come as a query as it is an optional method for the attendee to find the event
const getEventHostee = async(req,res)=>{
    const { token } = req.query
    let { id:eventID } = req.params

    if(token){
        payload = await verifyEventRegistrationToken(token) 
        eventID = payload.id
    }
    const event = await Event.findById({ _id:eventID })
    res.status(StatusCodes.OK).json({ event })
}

module.exports={
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvents,
    registerForEvent,
    verifyEventToken,
    trendingEvents,
    getAllEvents,
    getEventHostee
}
