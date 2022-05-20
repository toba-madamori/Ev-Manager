const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError, BadRequestError, NotFoundError } = require('../Errors')
const User = require('../Users/models')
const Profile = require('./models')


const getProfile = async(req,res)=>{
    const { id:profileID } = req.params

    const profile = await Profile.findById({ _id:profileID }).populate('userid', 'name email -_id')
    res.status(StatusCodes.OK).json({ profile })
}

const updateProfile = async(req,res)=>{
    const { name, email, phone_number, tags }= req.body
    const { userID:_id } = req.user
    const { id:profileID } = req.params
    
    const userUpdate = {}
    if(name && name !== '') userUpdate.name = name
    if(email && email !== '') userUpdate.email = email
    if(Object.keys(userUpdate).length !== 0) await User.findByIdAndUpdate({ _id }, userUpdate, {runValidators:true})

    const profileUpdate = {}
    if(phone_number && phone_number.length !==0) profileUpdate.phone_number = phone_number
    if(tags && tags.length !==0){
        const tagArr= tags.split(',')
        profileUpdate.tags = tagArr
    }

    const updatedProfile = await Profile.findByIdAndUpdate({ _id:profileID}, profileUpdate, { new:true,runValidators:true }).populate('userid', 'name email -_id')
    res.status(StatusCodes.OK).json({ updatedProfile })
}

const rateUser = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"rated user profile" })
}

module.exports = {
    updateProfile,
    rateUser,
    getProfile
}
