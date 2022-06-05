const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:[true, 'Please provide the userid']
    },
    name: {
        type:String,
        required:[true, 'please provide the restaurant name']
    },
    days_open: {
        type:String,
        required:[true, 'please provide the days your restaurant will be open']
    },
    opening_time: {
        type:String,
        required:[true, 'please provide your opening time']
    },
    closing_time: {
        type:String,
        required:[true, 'please provide your closing time']
    },
    menu: [{
        food: {
            type:String,
            required:[true, 'please provide the food name']
        },
        price: {
            type:Number,
            required:[true, 'please provide the price of food']
        },
        pictures: [{ 
            type:String,
            required:[true, 'please provide at least 3 pictures of this particular food']
        }],
        _id:false
    }],
    location: {
        type:String,
        required:[true, 'please provide the location of your restaurant']
    },
    capacity: {
        type:String,
        required:[true, 'please provide the capacity of your restaurant']
    },
    pictures: [{
        type:String,
        required:[true, 'please provide at least 5 pictures of your restaurant']
    }],
    rating: {
        type:Number,
        default:5.0
    }
}, {timestamps:true})


module.exports = mongoose.model('Restaurants', RestaurantSchema)
