const { UnauthenticatedError } = require('../Errors')
const { StatusCodes } = require('http-status-codes')


const userValidator = (user, userID)=>{
    return new Promise((resolve, reject)=>{
        if(JSON.stringify(user) !== JSON.stringify(userID)){
            return reject(new UnauthenticatedError('method not allowed'))
        }
        const valid = true
        resolve(valid)
    })
}

const updateValidator = (req) =>{
    return new Promise((resolve, reject)=>{
        try {
            const update = {}
            if(req.body.name) update.name = req.body.name
            if(req.body.image)update.image = req.body.image
            if(req.body.event_programme)update.event_programme = req.body.event_programme
            if(req.body.time)update.time = req.body.time
            if(req.body.date)update.date = req.body.date
            if(req.body.location)update.location = req.body.location
            if(req.body.event_type)update.event_type = req.body.event_type
            if(req.body.event_fee)update.event_fee = req.body.event_fee
            if(req.body.tags)update.tags = req.body.tags
            if(req.body.menu)update.menu = req.body.menu
            if(req.body.additional_activities)update.additional_activities = req.body.additional_activities
    
            resolve(update)
            
        } catch (error) {
            console.log(error);
            return reject(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    })
}

module.exports= {
    userValidator,
    updateValidator
}