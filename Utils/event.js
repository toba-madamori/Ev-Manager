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

module.exports= {
    userValidator
}