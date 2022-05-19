const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../Errors')

const authMiddleware = async (req,res,next)=>{
    let accessToken = req.headers.authorization

    if(!accessToken || !accessToken.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    
    accessToken = accessToken.split(' ')[1]
    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN)
        req.user ={ userID:payload.id} 
        next()
    } catch (error) {
        const message = error.name === 'TokenExpiredError' ? error.message : 'Authentication Invalid'
        throw new UnauthenticatedError(message)
    }

}

module.exports = authMiddleware