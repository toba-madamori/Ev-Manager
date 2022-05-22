const Joi = require('joi')


const name = Joi.string().trim(true).required()
const email = Joi.string().email().trim(true).required()
const password = Joi.string().min(6).trim(true).required().strict()
const provider = Joi.string().required()

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

const validation = Joi.object({
    userName: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
    mobileNumber: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    birthYear: Joi.number().integer().min(1920).max(2000),
    skillSet: Joi.array().items(Joi.string().alphanum().trim(true)).default([]),
    is_active: Joi.boolean().default(true),
});

module.exports = {
    registerValidator,
    loginValidator,
    forgotPasswordValidator,
    changePasswordValidator
}