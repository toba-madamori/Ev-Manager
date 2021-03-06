const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError, BadRequestError, NotFoundError } = require('../Errors')
const User = require('../Users/models')
const Profile = require('./models')
const stats = require('stats-lite')


//endpoint for a user to view their profile
const getProfile = async(req,res)=>{
    const { userID:_id } = req.user

    const profile = await Profile.findOne({userid:_id }).populate('userid', 'name email -_id')
    return res.status(StatusCodes.OK).json({ profile })
}

//endpoint for attendee to view event creator/host profile
const getEventHostProfile = async(req,res)=>{
    const { id:userID } = req.params
    const profile = await Profile.findOne({ userid:userID}).populate('userid', 'name email -_id')
    return res.status(StatusCodes.OK).json({ profile })
}

const updateProfile = async(req,res)=>{
    const { name, email, phone_number, tags }= req.body
    const { userID:_id } = req.user
    const { id:profileID } = req.params
    
    const userUpdate = {}
    if(name) userUpdate.name = name
    if(email) userUpdate.email = email
    if(Object.keys(userUpdate).length !== 0) await User.findByIdAndUpdate({ _id }, userUpdate)

    const profileUpdate = {}
    if(phone_number) profileUpdate.phone_number = phone_number
    if(tags) profileUpdate.tags = tags

    const updatedProfile = await Profile.findByIdAndUpdate({ _id:profileID}, profileUpdate, { new:true}).populate('userid', 'name email -_id')
    res.status(StatusCodes.OK).json({ updatedProfile })
}

const rateUser = async(req,res)=>{
    const { id:_id } = req.params
    let { rating } = req.query

    const profile = await Profile.findById(_id)
    rating = stats.mean([profile.rating, rating])
    rating = Math.round(rating)
    
    const updatedProfile = await Profile.findByIdAndUpdate({_id}, {rating}, {new:true})
    res.status(StatusCodes.OK).json({ updatedProfile })
}

module.exports = {
    updateProfile,
    rateUser,
    getProfile,
    getEventHostProfile
}
