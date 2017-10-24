import {
   UnauthorizedError,
   ForbiddenError
} from './../errorsApi';

import { findUserById } from './../mongoDbApi/services/user/userDbService';

class BaseAuthenticationMiddleware {

   /**
    * @public
    * @function constructor
    * @description constructor for the base authentication
    * @param {object} tokenHandlerMap - the token handler map object
    */
   constructor(tokenHandlerMap) {
      this._tokenHandlerMap = tokenHandlerMap;
   }

   /**
    * @private
    * @function _checkForAllowedRequests
    * @description checks for the requests which do not need authorization
    * @param {array} args the args array
    * @param {object} tokenHandler the token handler
    * @returns {Promise} of executed graphql schema
    */
   _checkForAllowedRequests(args, tokenHandler) {
      return new Promise((resolve, reject) => {
         try {
            if (this._allowedRequests(args)) {
               this._addContext(args, { tokenHandler });
               resolve(args);
            }
            else {
               reject(new UnauthorizedError());
            }
         } catch (error) {
            reject(new ForbiddenError());
         }
      });
   }

   /**
    * @public
    * @function apply
    * @description checks for the token in the variable and executes the graphql call
    * if no token is present allows just allowed Requests
    * @param {array} args the args array
    * @returns {Promise} of executed graphql schema
    */
   apply(args) {
      return new Promise((resolve, reject) => {
         let tokenHandler;
         try {
            tokenHandler = this._getTokenHandlerFromRequest(args, this._tokenHandlerMap);
         } catch (error) {
            reject(new UnauthorizedError());
         }

         const encryptedToken = this._getEncryptedToken(args);
         if (encryptedToken) {
            tokenHandler.validate(encryptedToken).then(tokenData => {
               findUserById(tokenData.userId).then(knownViewer => {
                  this._addContext(args, {
                     viewer: knownViewer,
                     tokenHandler
                  });
                  resolve(args);
               }).catch(error => Promise.reject(error));
            }).catch(error => {
               this._checkForAllowedRequests(args, tokenHandler)
                  .then(resolve).catch(reject);
            });
         }
         else {
            return this._checkForAllowedRequests(args, tokenHandler)
               .then(resolve).catch(reject);
         }
      });
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
      throw new Error("FATAL ERROR: BaseAuthenticationMiddleware inherited class needs to implements _getTokenHandlerFromRequest.");
   }

   /**
    * @protected
    * @function _allowedRequests
    * @description check for requests which are allowed when not logged in
    * @param {array} args the args array
    * @returns {bool} true when request is allowed
    */
   _allowedRequests(args) {
      throw new Error("FATAL ERROR: BaseAuthenticationMiddleware inherited class needs to implements _allowedRequests.");
   }

   /**
    * @protected
    * @function _getEncryptedToken
    * @description gets the encrypted token from the input
    * @param {array} args the args array
    * @returns {string} jwt token
    */
   _getEncryptedToken(args) {
      throw new Error("FATAL ERROR: BaseAuthenticationMiddleware inherited class needs to implements _getEncryptedToken.");
   }

   /**
    * @protected
    * @function _addContext
    * @description adds the viewer to the args for the next steps
    * @param {array} args the args array
    * @param {object} context the context to add
    */
   _addContext(args, context) {
      throw new Error("FATAL ERROR: BaseAuthenticationMiddleware inherited class needs to implements _addContext.");
   }
};

export default BaseAuthenticationMiddleware;