const { StatusCodes } = require('http-status-codes')
const Restaurant = require('./model')

const createRestaurant = async(req,res)=>{
    const { userID } = req.user
    req.body.userid = userID

    const restaurant = await Restaurant.create({ ...req.body })

    res.status(StatusCodes.CREATED).json({ restaurant })
}

const getRestaurant = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"get a restaurant" })
}

const updateRestaurant = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:"update a restaurant" })
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