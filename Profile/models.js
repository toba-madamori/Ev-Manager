const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:[true, 'Please provide the userid']
    },
    phone_number:{
        type:String,
    },
    tags:[{
        type:String,
        default:"Null"
    }],
    rating:{
        type:Number,
        default:5.0
    }
}, {timestamps:true})

module.exports = mongoose.model('Profiles', ProfileSchema)
