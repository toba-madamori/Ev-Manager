const { StatusCodes } = require('http-status-codes')
const { FindOrCreate } = require('../Utils/passport')
const { signAccessToken, confirmRegistrationToken, verifyConfirmRegistrationToken} = require('../Utils/tokens')
const User = require('./models')
const registrationMail = require('../templates/emails/registrationMail')
const sendEmail = require('../Utils/emailService')
const { UnauthenticatedError } = require('../Errors')


const register = async(req,res)=>{
    const user = await User.create({...req.body})
    
    const token = await confirmRegistrationToken(user)
    const link = `${req.protocol}://${req.headers.host}${process.env.CONFIRM_REGISTRATION_URL}/${user._id}/${token}`

    sendEmail(new registrationMail(user.email, link))
    res.status(StatusCodes.CREATED).json({ msg:'successful registration, please head to your mail to complete your registration' })
}

const confirmRegistration = async(req,res)=>{
    const {id:_id, token} = req.params
    const user = await User.findById(_id)

    if(!user)throw new UnauthenticatedError('sorry this user does not exist')
    
    const valid = await verifyConfirmRegistrationToken(user, token)

    if(!valid)throw new UnauthenticatedError('Invalid Token')

    const updatedUser = await User.findByIdAndUpdate({ _id }, { verified:true }, {runValidators:true})

    res.status(StatusCodes.OK).json({ msg:'your registration is complete, please head to the login page..' })
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