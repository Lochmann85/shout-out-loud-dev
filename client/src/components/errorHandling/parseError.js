
/**
 * @public
 * @function parseErrorMessage
 * @description parses the error message json
 * @param {object} graphQLError the error for the graphql call
 * @returns {array} of errors with key message
 */
const parseErrorMessage = (graphQLError) => {
   const shownErrors = [];

   try {
      const parsedError = JSON.parse(graphQLError.message);

      const parsedErrorMessage = JSON.parse(parsedError.message);
      if (Array.isArray(parsedErrorMessage)) {
         parsedErrorMessage.forEach(error => {
            shownErrors.push(error);
         });
      }
      else {
         shownErrors.push(parsedErrorMessage);
      }
   }
   catch (parseError) {
      shownErrors.push({
         message: graphQLError.message,
         key: graphQLError.key,
      });
   }

   return shownErrors;
};

/**
 * @public
 * @function parseErrorStatus
 * @description parses the error status json
 * @param {object} graphQLError the error for the graphql call
 * @returns {string} of errorstatus
 */
const parseErrorStatus = (graphQLError) => {
   try {
      const parsedError = JSON.parse(graphQLError.message);

      return parsedError.status;
   }
   catch (parseError) {
      return null;
   }
};

export {
   parseErrorMessage,
   parseErrorStatus
};