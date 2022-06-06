const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../Errors')
const Restaurant = require('./model')
const { userValidator } = require('../Utils/event')
const stats = require('stats-lite')


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
    const { id:restaurantID } = req.params
    const { userID } = req.user

    const prevRestaurant = await Restaurant.findById(restaurantID)
    if(!prevRestaurant) throw new NotFoundError("sorry this restuarant doesn't exist")    

    await userValidator(prevRestaurant.userid, userID)
    await Restaurant.findByIdAndDelete(restaurantID)

    res.status(StatusCodes.OK).json({ msg:"success" })
}

const rateRestaurant = async(req,res)=>{
    const { id:restaurantID } = req.params
    let { rating } = req.query

    const prevRestaurant = await Restaurant.findById(restaurantID)
    if(!prevRestaurant) throw new NotFoundError("sorry this restaurant doesn't exist")

    rating = stats.mean([prevRestaurant.rating, rating])
    rating = Math.round(rating)
    
    const restaurant = await Restaurant.findByIdAndUpdate({ _id:restaurantID }, { rating }, { new:true })

    res.status(StatusCodes.OK).json({ restaurant })
}

const searchRestaurants = async(req,res)=>{
    let { name, location } = req.query

    const queryObject = {}

    if(name){
        queryObject.name = { $regex:name, $options:'i' }
    }
    if(location){
        queryObject.location = { $regex:location, $options:'i' }
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 0;
    const skip = (page - 1)*limit;

    const restaurants = await Restaurant.find(queryObject).select('_id name').skip(skip).limit(limit)
    res.status(StatusCodes.OK).json({ restaurants, nbhits:restaurants.length })
}

module.exports = {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
    rateRestaurant,
    searchRestaurants
}