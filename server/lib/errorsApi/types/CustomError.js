import BaseError from './../BaseError';

/**
 * @public
 * @function constructor
 * @description the constructor for a custom error
 * @param {string} name - The name of the error.
 * @param {object} errors - The error object containing message and key.
 */
function CustomError(name, errors) {
   this.name = name;
   this.status = 500;

   BaseError.call(this, errors);
}
CustomError.prototype = Object.create(BaseError.prototype);

export default CustomError;