import {
   UnauthorizedError,
   ForbiddenError
} from './../errorsApi';

class BaseAuthenticationMiddleware {

   /**
    * @public
    * @function constructor
    * @description constructor for the base authentication
    * @param {object} tokenHandler - the token handler object
    */
   constructor(tokenHandler) {
      this._tokenHandler = tokenHandler;
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
         const encryptedToken = this._getEncryptedToken(args);
         if (encryptedToken) {
            this._tokenHandler.validate(encryptedToken).then(knownViewer => {
               this._addContext(args, {
                  viewer: knownViewer,
                  tokenHandler: this._tokenHandler
               });
               resolve(args);
            }).catch(reject);
         }
         else {
            try {
               if (this._allowedRequests(args)) {
                  this._addContext(args, {
                     tokenHandler: this._tokenHandler
                  });
                  resolve(args);
               }
               else {
                  reject(new UnauthorizedError());
               }
            } catch (error) {
               reject(new ForbiddenError());
            }
         }
      });
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