import {
   MongooseValidationError
} from './../errorsApi';

/**
 * @public
 * @function convertMongooseError
 * @description converts a mongoose error to a readable error
 * @param {object} mongooseError - the error object
 * @returns {Promise} of errors
 */
const convertMongooseError = (mongooseError) => {
   const errors = [];
   if (mongooseError.errors) {
      Object.keys(mongooseError.errors).forEach(key => {
         errors.push({
            message: mongooseError.errors[key].message,
            key
         });
      });
   }
   else if (mongooseError.message) {
      errors.push({
         message: mongooseError.message,
         key: mongooseError.path
      });
   }
   else {
      errors.push({ message: mongooseError });
   }

   const error = new MongooseValidationError(errors);
   return Promise.reject(error);
};

export default convertMongooseError;