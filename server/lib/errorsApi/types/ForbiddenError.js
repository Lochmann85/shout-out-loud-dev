import BaseError from './../BaseError';

/**
 * @public
 * @function constructor
 * @description the constructor for a forbidden error
 */
function ForbiddenError() {
   this.name = "Forbidden";
   this.status = 403;

   BaseError.call(this, {
      message: `You do not have the permissions.`,
      key: "NOT_ALLOWED"
   });
}
ForbiddenError.prototype = Object.create(BaseError.prototype);

export default ForbiddenError;