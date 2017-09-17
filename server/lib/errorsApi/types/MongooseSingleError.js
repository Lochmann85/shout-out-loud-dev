import InternalServerError from './InternalServerError';

/**
 * @public
 * @function constructor
 * @description the constructor for a single mongoose error
 * @param {object} error - The error object containing message.
 */
function MongooseSingleError(error) {
   InternalServerError.call(this, {
      message: error.message,
      key: "MONGOOSE_ERROR"
   });
}
MongooseSingleError.prototype = Object.create(InternalServerError.prototype);

export default MongooseSingleError;