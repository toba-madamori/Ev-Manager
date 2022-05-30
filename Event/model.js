const mongoose = require('mongoose')


const EventSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
        required:[true, 'Please provide the userid']
    },
    name:{
        type:String,
        required:[true, 'Please provide the event name']
    },
    image:[{
        type:String,
        default: "Null"
    }],
    event_programme:[{
        type:String,
        default:"Null"
    }],
    time:{
        type:String,
        required:[true, 'Please provide the event time']
    },
    date:{
        type:Date,
        required:[true, 'Please provide the event date']
    },
    location:{
        type:String,
        required:[true, 'Please provide the event location']
    },
    event_type:{
        type:String,
        required:[true, 'Please provide the event type'],
        values: {
            enum: ['Public', 'Private'],
            message: '{VALUE} is not supported',
        }
    },
    event_fee:{
        type:Number,
        required:[true, 'Please provide the event fee'],
    },
    tags:[{
        type:String,
        required:[true, 'Please provide some tags for your event'],
    }],
    menu:[{
        type:String,
        required:[true, 'Please provide a menu for your event'],
    }],
    additional_activities:[
        {
            activity_name:{
                type:String,
                required:[true, 'Please provide the activity name']
            },
            price:{
                type:Number,
                required:[true, 'Please provide the activity price']
            },
            description:{
                type:String,
                required:[true, 'Please provide the activity description']
            },
            _id:false

        }
    ],
    num_reg_hostees:{
        type:Number,
        default:0
    }
},{timestamps:true})

const LinkSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
        required:[true, 'Please provide the userid']
    },
    eventid:{
        type:mongoose.Types.ObjectId,
        ref:"Events",
        required:[true, 'Please provide the eventid']
    },
    reg_token:{
        type:String,
        required:[true, 'Please provide the reg token']
    }
},{timestamps:true})


const Event =  mongoose.model("Events", EventSchema)
const Link = mongoose.model("Links", LinkSchema)

module.exports={
    Event,
    Link
}
