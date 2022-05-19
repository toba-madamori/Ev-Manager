const { StatusCodes } = require('http-status-codes')
const { FindOrCreate } = require('../Utils/passport')
const { signAccessToken } = require('../Utils/tokens')


const register = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"register new user" })
}

const login = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"login new user" })
}

const passportGoogle = async(req,res)=>{
    let user = req.user
    const validatedOrCreatedUser = await FindOrCreate(user)

    if(!validatedOrCreatedUser.confirmed){
        // send confirm registration email
        return res.status(StatusCodes.OK).json({ msg:"successful registration, head to your email to confirm your registration" })
    }
    const accessToken = await signAccessToken(validatedOrCreatedUser._id)
    res.status(StatusCodes.OK).json({ accessToken })
}

const confirmRegistration = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"confirm new user" })
}

const forgotPassword = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"forgot password" })
}

const resetPassword = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"reset password" })
}

const changePassword = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"change password" })
}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    confirmRegistration,
    passportGoogle
}