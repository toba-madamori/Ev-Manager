const { StatusCodes } = require('http-status-codes')
const { FindOrCreate } = require('../Utils/passport')
const { signAccessToken, confirmRegistrationToken, verifyConfirmRegistrationToken, forgotPasswordToken, verifyForgotPasswordToken} = require('../Utils/tokens')
const User = require('./models')
const registrationMail = require('../templates/emails/registrationMail')
const passwordResetMail = require('../templates/emails/passwordResetMail')
const sendEmail = require('../Utils/emailService')
const { UnauthenticatedError, BadRequestError, NotFoundError } = require('../Errors')
const bcrypt = require('bcrypt')
const Profile = require('../Profile/models')

const register = async(req,res)=>{
    const user = await User.create({...req.body})
    const profile = await Profile.create({ userid:user._id })
    
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

    const updatedUser = await User.findByIdAndUpdate({ _id }, { verified:true })

    res.status(StatusCodes.OK).json({ msg:'your registration is complete, please head to the login page..' })
}

const login = async(req,res)=>{
    const user = await User.findOne({ email:req.body.email })
    if(!user) throw new UnauthenticatedError('Invalid credentials')

    const isMatch = await user.comparePassword(req.body.password)
    if(!isMatch) throw new UnauthenticatedError('Invalid credentials')

    const confirmRegistration = user.verified
    if(!confirmRegistration) throw new UnauthenticatedError('Incomplete registration error')


    const accessToken = await signAccessToken(user._id)

    res.status(StatusCodes.OK).json({ accessToken })
}

const passportGoogle = async(req,res)=>{
    let user = req.user
    const validatedOrCreatedUser = await FindOrCreate(user)

    const accessToken = await signAccessToken(validatedOrCreatedUser._id)
    res.status(StatusCodes.OK).json({ accessToken })
}


const forgotPassword = async(req,res)=>{
    const { email } = req.body
    
    const user = await User.findOne({ email })
    if(!user) throw new UnauthenticatedError('Invalid credentials')

    const token = await forgotPasswordToken(user)
    const link = `${req.protocol}://${req.headers.host}${process.env.RESET_PASSWORD_URL}/${user._id}/${token}`

    sendEmail(new passwordResetMail(email, link))

    res.status(StatusCodes.OK).json({ msg:'A reset password link has been sent to your email' })
}

const resetPassword = async(req,res)=>{
    const { id:_id, token } = req.params
    let { new_password } = req.body

    const user = await User.findById(_id)
    if(!user) throw new NotFoundError('sorry this user does not exist')

    const valid = await verifyForgotPasswordToken(user,token)
    if(!valid) throw new UnauthenticatedError('Invalid password reset params')

    const salt = await bcrypt.genSalt(10)
    new_password = await bcrypt.hash(new_password, salt)

    const updatedUserPassword = await User.findByIdAndUpdate({ _id }, { password:new_password }, {runValidators:true})
    if(updatedUserPassword){
        return res.status(StatusCodes.OK).json({ msg:'password reset successful' })
    }
}

const changePassword = async(req,res)=>{
    let { old_password, new_password } = req.body
    const { userID:_id } = req.user
    
    const user = await User.findById(_id)

    const isMatch = await user.comparePassword(old_password)
    if(!isMatch) throw new UnauthenticatedError('Invalid credentials')

    const salt = await bcrypt.genSalt(10)
    new_password = await bcrypt.hash(new_password, salt)

    const updatedUserPassword = await User.findByIdAndUpdate({ _id }, { password:new_password })
    if(updatedUserPassword){
        return res.status(StatusCodes.OK).json({ msg:'password reset successful' })
    }
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