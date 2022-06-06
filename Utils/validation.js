const Joi = require('joi')


const string_required = Joi.string().trim(true).required()
const email = Joi.string().email().trim(true).required()
const password = Joi.string().min(6).trim(true).required().strict()
const provider = Joi.string().required()
const phone_number = Joi.string().length(11).pattern(/^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/)
const array = Joi.array().items(Joi.string().trim(true))
const rating = Joi.number().integer().min(1).max(5)
const id = Joi.string().hex().length(24).pattern(/^[0-9a-fA-F]{24}$/).required()

const registerSchema = Joi.object().keys({
    name:string_required,
    email,
    password
})

const loginSchema = Joi.object().keys({
    email,
    password
})

const forgotPasswordSchema = Joi.object().keys({
    email
})

const ratingSchema = Joi.object().keys({
    rating
})

const changePasswordSchema = Joi.object().keys({
    new_password:password,
    old_password:password
})

const profileUpdateSchema = Joi.object().keys({
    name: Joi.string().trim(true),
    email: Joi.string().email().trim(true),
    phone_number,
    tags:array
})

const createEventSchema = Joi.object().keys({
    name:string_required,
    image: array,
    event_programme: array,
    time: string_required,
    date: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}).required(),
    location: string_required,
    event_type: Joi.string().valid('Public', 'Private').required(),
    event_fee: Joi.number().integer().required(),
    tags: Joi.array().items(Joi.string().trim(true)).required(),
    menu: Joi.array().items(Joi.string().trim(true)).required(),
    additional_activities: Joi.array().items({
        activity_name: Joi.string().required(),
        price: Joi.number().integer().required(),
        description: Joi.string().required()
    })
})

const idValidator = Joi.object().keys({
    id: Joi.string().hex().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),
    token: Joi.string()
})

const updateEventSchema = Joi.object().keys({
    name:Joi.string().trim(true),
    image: array,
    event_programme: array,
    time: Joi.string().trim(true),
    date: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}),
    location: Joi.string().trim(true),
    event_type: Joi.string().valid('Public', 'Private'),
    event_fee: Joi.number().integer(),
    tags: Joi.array().items(Joi.string().trim(true)),
    menu: Joi.array().items(Joi.string().trim(true)),
    additional_activities: Joi.array().items({
        activity_name: Joi.string().required(),
        price: Joi.number().integer().required(),
        description: Joi.string().required()
    })
})

const optionalIdValidator = Joi.object().keys({
    id: Joi.string().hex().length(24).pattern(/^[0-9a-fA-F]{24}$/)
})

const getEventValidator = Joi.object().keys({
    tags: Joi.string().trim(true),
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
    token: Joi.string()
})

const createRestaurantSchema = Joi.object().keys({
    name:string_required,
    days_open:string_required,
    opening_time:string_required,
    closing_time:string_required,
    menu:Joi.array().items({
        food: Joi.string().required(),
        price: Joi.number().integer().required(),
        pictures: Joi.array().items(Joi.string().trim(true)).min(3).max(5).required()
    }).required(),
    location:string_required,
    capacity:Joi.number().integer().required(),
    pictures:Joi.array().items(Joi.string().trim(true)).min(5).max(10).required(),
    rating
})

const restaurantID = Joi.object().keys({
    id
})

const updateRestaurantSchema = Joi.object().keys({
    name:Joi.string().trim(true),
    days_open:Joi.string().trim(true),
    opening_time:Joi.string().trim(true),
    closing_time:Joi.string().trim(true),
    menu:Joi.array().items({
        food: Joi.string().required(),
        price: Joi.number().integer().required(),
        pictures: Joi.array().items(Joi.string().trim(true)).min(3).max(5).required()
    }),
    location:Joi.string().trim(true),
    capacity:Joi.number().integer(),
    pictures:Joi.array().items(Joi.string().trim(true)).min(5).max(10),
    rating
})

const searchSchema = Joi.object().keys({
    name:Joi.string().trim(true),
    location:Joi.string().trim(true),
    page: Joi.number().integer(),
    limit: Joi.number().integer()
})

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    changePasswordSchema,
    profileUpdateSchema,
    ratingSchema,
    createEventSchema,
    idValidator,
    updateEventSchema,
    getEventValidator,
    optionalIdValidator,
    createRestaurantSchema,
    restaurantID,
    updateRestaurantSchema,
    searchSchema
}
