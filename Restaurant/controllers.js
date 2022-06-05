const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../Errors')
const Restaurant = require('./model')
const { userValidator } = require('../Utils/event')

const createRestaurant = async(req,res)=>{
    const { userID } = req.user
    req.body.userid = userID

    const restaurant = await Restaurant.create({ ...req.body })

    res.status(StatusCodes.CREATED).json({ restaurant })
}

const getRestaurant = async(req,res)=>{
    const { id:restaurantID } = req.params 

    const restaurant = await Restaurant.findById(restaurantID)
    if(!restaurant) throw new NotFoundError("sorry this restuarant doesn't exist")

    res.status(StatusCodes.OK).json({ restaurant })
}

const updateRestaurant = async(req,res)=>{
    const { id:restaurantID } = req.params
    const { userID } = req.user

    const prevRestaurant = await Restaurant.findById(restaurantID)
    if(!prevRestaurant) throw new NotFoundError("sorry this restuarant doesn't exist")

    await userValidator(prevRestaurant.userid, userID)
    const update = { ...req.body }

    const restaurant = await Restaurant.findByIdAndUpdate({ _id:restaurantID }, update, { new:true })
    res.status(StatusCodes.OK).json({ restaurant })
}

const deleteRestaurant = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"delete a restaurant" })
}

const rateRestaurant = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"rate a restaurant" })
}

const searchRestaurants = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"search for restaurants" })
}

module.exports = {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
    rateRestaurant,
    searchRestaurants
}