import browserHistory from './../../storeHandler/routerHistory';

/**
 * @public
 * @function checkForUnauthorizedInErrors
 * @description checks the request errors for unauthorized error
 * redirects on other errors
 * @param {object} queryError the error for the graphql call
 */
const checkForUnauthorizedInErrors = (queryError) => {
   const errors = queryError.networkError ? queryError.networkError : queryError.graphQLErrors;

   let hasOnlyUnauthorized = false;
   errors.forEach(error => {
      if (error.name !== "Unauthorized") {
         hasOnlyUnauthorized = true;
      }
   });
   if (hasOnlyUnauthorized) {
      browserHistory.push("/error", { errors: errors });
   }
};

export {
   checkForUnauthorizedInErrors
};