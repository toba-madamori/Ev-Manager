const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Please provide your name'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'Please provide an email address'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email address'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'please provide a password'],
        minlength:6
    },
    verified:{
        type:Boolean,
        default:false
    },
    provider: {
        type:String,
        default:"Null"
    }

}, {timestamps:true})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    const ismatch = await bcrypt.compare(candidatePassword, this.password)
    return ismatch
}

module.exports = mongoose.model('Users', UserSchema)
