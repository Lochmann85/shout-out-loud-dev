
/**
 * @public
 * @function constructor
 * @description the constructor for the base error
 * @param {object} errors - The error object containing message and key.
 */
function BaseError(errors) {
   const error = {};
   error.status = this.status;

   let message = null;
   try {
      message = JSON.stringify(errors);
   } catch (error) {
      message = error;
   }
   error.message = message;

   this.message = JSON.stringify(error);
}
BaseError.prototype = Object.create(Error.prototype);

export default BaseError;