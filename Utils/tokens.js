const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const signAccessToken = (userID)=>{
    return new Promise((resolve, reject)=>{
        const payload = {
            id:userID
        }
        const secret = process.env.JWT_SECRET_ACCESS_TOKEN
        const options = {
            expiresIn:process.env.JWT_LIFETIME_ACCESS_TOKEN       // remember to add the issuer option when we get a domain name
        }                                                         // can also add an audience option with the userid if you like
        jwt.sign(payload, secret, options, (err, token)=>{
            if(err){
            console.log(err.message);                            // or a production grade logger
            reject(StatusCodes.INTERNAL_SERVER_ERROR)
        }    
            resolve(token)
        })
    })
}

const forgotPasswordToken = (user)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            email:user.email,
            id:user._id
        }
        const secret = process.env.JWT_SECRET_FORGOT_PASSWORD + user.password
        const options = {
            expiresIn:process.env.JWT_LIFETIME_FORGOT_PASSWORD
        }
        jwt.sign(payload,secret,options, (err, token)=>{
            if(err){
                console.log(err)
                reject(StatusCodes.INTERNAL_SERVER_ERROR)
            }
            resolve(token)
        })
    })
}

const verifyForgotPasswordToken = (user,token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.JWT_SECRET_FORGOT_PASSWORD + user.password, (err,payload)=>{
            if(err) return reject(StatusCodes.UNAUTHORIZED)
            const valid = true
            resolve(valid)
        })
    })
}

const confirmRegistrationToken = (user)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            email:user.email,
            id:user._id
        }
        const secret = process.env.JWT_SECRET_CONFIRM_REG_TOKEN + user.password
        const options = {
            expiresIn:process.env.JWT_LIFETIME_CONFIRM_REG_TOKEN
        }
        jwt.sign(payload,secret,options, (err, token)=>{
            if(err){
                console.log(err)
                reject(StatusCodes.INTERNAL_SERVER_ERROR)
            }
            resolve(token)
        })
    })
}

const verifyConfirmRegistrationToken = (user,token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.JWT_SECRET_CONFIRM_REG_TOKEN + user.password, (err,payload)=>{
            if(err){
                console.log(err);
                return reject(StatusCodes.UNAUTHORIZED)
            }    
            const valid = true
            resolve(valid)
        })
    })
}
module.exports = {
    signAccessToken,
    forgotPasswordToken,
    verifyForgotPasswordToken,
    confirmRegistrationToken,
    verifyConfirmRegistrationToken
}