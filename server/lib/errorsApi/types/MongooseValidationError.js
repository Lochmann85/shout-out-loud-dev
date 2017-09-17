import BaseError from './../BaseError';

/**
 * @public
 * @function constructor
 * @description the constructor for a mongoose validation error
 * @param {object} errors - The error object containing message and key.
 */
function MongooseValidationError(errors) {
   this.name = "MongooseValidation";
   this.status = 500;

   BaseError.call(this, errors);
}
MongooseValidationError.prototype = Object.create(BaseError.prototype);

export default MongooseValidationError;