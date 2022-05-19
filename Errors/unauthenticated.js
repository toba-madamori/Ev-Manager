const CustomApiError = require('../Errors/customapierror')
const { StatusCodes } = require('http-status-codes')

class UnauthenticatedError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError;