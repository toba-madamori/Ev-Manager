const CustomApiError = require('../Errors/customapierror')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError;