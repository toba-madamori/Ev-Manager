const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError, BadRequestError, NotFoundError } = require('../Errors')
const User = require('../Users/models')
const Profile = require('./models')
const { profileUpdateValidator } = require('../Utils/validation')


const getProfile = async(req,res)=>{
    const { id:profileID } = req.params

    const profile = await Profile.findById({ _id:profileID }).populate('userid', 'name email -_id')
    res.status(StatusCodes.OK).json({ profile })
}

const updateProfile = async(req,res)=>{
    const { error } = profileUpdateValidator.validate({...req.body})
    if(error) throw new BadRequestError(error.message)

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
    res.status(StatusCodes.OK).json({ msg:"rated user profile" })
}

module.exports = {
    updateProfile,
    rateUser,
    getProfile
}
