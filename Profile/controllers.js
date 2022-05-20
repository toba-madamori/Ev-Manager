const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError, BadRequestError, NotFoundError } = require('../Errors')


const updateProfile = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"updated user profile" })
}

const rateUser = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"rated user profile" })
}

module.exports = {
    updateProfile,
    rateUser
}
