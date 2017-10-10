import browserHistory from './../../storeHandler/routerHistory';

import { parseErrorMessage } from './parseError';

/**
 * @private
 * @function _handleNetworkErrors
 * @description handles a network error and browses to the error page
 * @param {object} networkError the error for the network
 */
const _handleNetworkErrors = (networkError) => {
   browserHistory.push("/error", { errors: networkError });
};

/**
 * @private
 * @function _getGraphQLErrors
 * @description getter for the graphql errors
 * @param {object} graphQLErrors the error for graphQL
 * @returns {array} of errors with key message
 */
const _getGraphQLErrors = (graphQLErrors) => {
   let shownErrors = [];

   graphQLErrors.forEach(error => {
      shownErrors = [...shownErrors, ...parseErrorMessage(error)];
   });

   return shownErrors;
};

/**
 * @public
 * @function mutationErrorHandling
 * @description converts the json mutation errors to js objects
 * @param {object} mutationError the error for the mutation
 * @param {function} onShowError function which is called when the error should be shown
 */
const mutationErrorHandling = (mutationError, onShowError) => {
   if (mutationError.networkError) {
      _handleNetworkErrors(mutationError.networkError);
   }
   else if (mutationError.graphQLErrors) {
      onShowError(_getGraphQLErrors(mutationError.graphQLErrors));
   }
};

export default mutationErrorHandling;