import jwt from 'jsonwebtoken';

import configurations from './../configurations';

import {
   UnauthorizedError,
   InternalServerError,
} from './../errorsApi';

/**
 * @public
 * @function validateToken
 * @description validates the jwt token
 * @param {string} jwtToken - the jwt token
 * @returns {Promise} of decrypted token
 */
const validateToken = (jwtToken) => new Promise((resolve, reject) => {
   jwt.verify(jwtToken, config.JWT_SECRET, (error, decodedToken) => {
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
 * @function createNewToken
 * @description creates a new jwt with the encrypted user id
 * @param {object} user - the authenticated user
 * @returns {Promise} of new token
 */
const createNewToken = (user) => new Promise((resolve, reject) => {
   const encryptedData = {
      userId: user.id
   };
   const options = {
      expiresIn: 60 * 60 * 24 // one day
   };
   jwt.sign(encryptedData, config.JWT_SECRET, options, (error, jwtToken) => {
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

export {
   validateToken,
   createNewToken
};