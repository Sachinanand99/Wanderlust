class ExpressError extends Error{
    constructor(statusCode, message){
        super();
        this.message = message;
        this.status = statusCode;
    }
}

module.exports = ExpressError;