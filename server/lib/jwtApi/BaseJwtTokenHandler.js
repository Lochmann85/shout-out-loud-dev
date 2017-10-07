import jwt from 'jsonwebtoken';

import {
   UnauthorizedError,
   InternalServerError,
} from './../errorsApi';

class BaseJwtTokenHandler {

   /**
    * @public
    * @function constructor
    * @description constructor of base jwt token handler
    * @param {String} secret 
    * @param {String} expirationTime 
    */
   constructor(secret, expirationTime) {
      this._secret = secret;
      this._expirationTime = expirationTime;
   }

   /**
    * @public
    * @function validate
    * @description validates the jwt token
    * @param {string} encryptedJwtToken - the encrypted jwt token
    * @returns {Promise} of decrypted token
    */
   validate = (encryptedJwtToken) => new Promise((resolve, reject) => {
      jwt.verify(encryptedJwtToken, this._secret, (error, decodedToken) => {
         if (!error) {
            resolve(decodedToken);
         }
         else {
            if (error.name === "TokenExpiredError") {
               reject(new UnauthorizedError());
            }
            else {
               reject(new InternalServerError({
                  message: error.message,
                  key: "JWT_ERROR"
               }));
            }
         }
      });
   });

   /**
    * @public
    * @function encrypt
    * @description encrypts the current jwt with the user id
    * @param {object} user - the authenticated user
    * @returns {Promise} of new token
    */
   encrypt = (user) => new Promise((resolve, reject) => {
      const encryptedData = {
         userId: user.id
      };
      const options = {
         expiresIn: this._expirationTime,//60 * 60 * 24 // one day
      };
      jwt.sign(encryptedData, this._secret, options, (error, jwtToken) => {
         if (!error) {
            resolve(jwtToken);
         }
         else {
            reject(new InternalServerError({
               message: error.message,
               key: "JWT_ERROR"
            }));
         }
      });
   });

};

export default BaseJwtTokenHandler