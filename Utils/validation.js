const Joi = require('joi')


const name = Joi.string().trim(true).required()
const email = Joi.string().email().trim(true).required()
const password = Joi.string().min(6).trim(true).required().strict()
const provider = Joi.string().required()
const phone_number = Joi.string().length(11).pattern(/^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/)
const tags = Joi.array().items(Joi.string().trim(true))
const rating = Joi.number().integer().min(1).max(5)

const registerValidator = Joi.object().keys({
    name,
    email,
    password
})

const loginValidator = Joi.object().keys({
    email,
    password
})

const forgotPasswordValidator = Joi.object().keys({
    email
})

const changePasswordValidator = Joi.object().keys({
    new_password:password,
    old_password:password
})

const profileUpdateValidator = Joi.object().keys({
    name: Joi.string().trim(true),
    email: Joi.string().email().trim(true),
    phone_number,
    tags
})

module.exports = {
    registerValidator,
    loginValidator,
    forgotPasswordValidator,
    changePasswordValidator,
    profileUpdateValidator
}