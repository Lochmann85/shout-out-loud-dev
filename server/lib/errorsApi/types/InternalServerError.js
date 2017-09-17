import BaseError from './../BaseError';

/**
 * @public
 * @function constructor
 * @description the constructor for an internal server error
 * @param {object} errors - The error object containing message and key.
 */
function InternalServerError(errors) {
   this.name = "InternalServer";
   this.status = 500;

   BaseError.call(this, errors);
}
InternalServerError.prototype = Object.create(BaseError.prototype);

export default InternalServerError;