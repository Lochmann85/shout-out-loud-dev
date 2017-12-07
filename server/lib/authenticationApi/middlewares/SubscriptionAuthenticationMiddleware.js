import BaseAuthenticationMiddleware from './../BaseAuthenticationMiddleware';

import { GraphQLTokenHandler } from './../../jwtApi/jwtService';

class SubscriptionAuthenticationMiddleware extends BaseAuthenticationMiddleware {

   /**
    * @public
    * @function constructor
    * @description constructor for the subscription authentication
    */
   constructor() {
      super({
         sendResetPasswordMutation: new GraphQLTokenHandler(), //TODO: needs different token handler
         resetPasswordMutation: new GraphQLTokenHandler(), //TODO: needs different token handler
         default: new GraphQLTokenHandler(),
      });
      this._notAuthenticatedRequests = [
         {
            operationName: "shoutsQueueQuery",
            searchString: "getShoutsQueue"
         },
         {
            operationName: "currentShoutQuery",
            searchString: "getCurrentShout"
         },
         {
            operationName: "shoutsQueueSubscription",
            searchString: "shoutsQueueChanged"
         },
         {
            operationName: "loginMutation",
            searchString: "login"
         },
         {
            operationName: "signupMutation",
            searchString: "signup"
         },
         {
            operationName: "sendResetPasswordMutation",
            searchString: "sendResetPassword"
         },
         {
            operationName: "resetPasswordMutation",
            searchString: "resetPassword"
         }
      ];
   }

   /**
    * @protected
    * @function _allowedRequests
    * @description check for requests which are allowed when not logged in
    * @param {array} args the args array
    * @returns {bool} true when request is allowed
    */
   _allowedRequests(args) {
      const [schema, document, root, context, variables, operation] = args; // eslint-disable-line no-unused-vars

      let foundRequest = false;
      this._notAuthenticatedRequests.forEach(allowedRequest => {
         if (operation === allowedRequest.operationName &&
            document.definitions[0].selectionSet.selections[0].name.value === allowedRequest.searchString) {
            foundRequest = true;
         }
      });
      return foundRequest;
   }

   /**
    * @protected
    * @function _getTokenHandlerFromRequest
    * @description gets the encrypted token from the input and the token mapping
    * @param {array} args the args array
    * @param {object} tokenHandlerMap the token handler mapping
    * @returns {bool} true when request is allowed
    */
   _getTokenHandlerFromRequest(args, tokenHandlerMap) {
      const [schema, document, root, context, variables, operation] = args; // eslint-disable-line no-unused-vars

      const tokenHandler = tokenHandlerMap.operation;
      if (tokenHandler) {
         return tokenHandler;
      }
      else {
         return tokenHandlerMap.default;
      }
   }

   /**
    * @protected
    * @function _getEncryptedToken
    * @description gets the encrypted token from the input
    * @param {array} args the args array
    * @returns {string} jwt token
    */
   _getEncryptedToken(args) {
      const [schema, document, root, context, variables, operation] = args; // eslint-disable-line no-unused-vars
      return variables && variables.token ? variables.token : undefined;
   }

   /**
    * @protected
    * @function _addContext
    * @description adds the viewer to the args for the next steps
    * @param {array} args the args array
    * @param {object} additionalContext the context to add
    */
   _addContext(args, additionalContext) {
      const [schema, document, root, context, variables, operation] = args; // eslint-disable-line no-unused-vars
      Object.assign(context, additionalContext);
   }

}

export default SubscriptionAuthenticationMiddleware;