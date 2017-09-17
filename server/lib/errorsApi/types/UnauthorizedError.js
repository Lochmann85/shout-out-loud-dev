import BaseError from './../BaseError';

/**
 * @public
 * @function constructor
 * @description the constructor for a unauthorized error
 */
function UnauthorizedError() {
   this.name = "Unauthorized";
   this.status = 401;

   BaseError.call(this, {
      message: `Please log in.`,
      key: "NOT_LOGGED_IN"
   });
}
UnauthorizedError.prototype = Object.create(BaseError.prototype);

export default UnauthorizedError;