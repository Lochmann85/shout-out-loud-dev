import { isEmail } from 'validator';

import convertMongooseError from './../../convertMongooseToReadableError';
import { CustomError } from './../../../errorsApi';
import { userModel } from './../../models';

import { findUser } from './userDbService';

/**
 * @public
 * @function findUserByEMail
 * @description looks for the user
 * @param {string} email - email
 * @returns {Promise} of send email
 */
const findUserByEMail = (email) => {
   if (isEmail(email)) {
      const userQuery = userModel.findOne({ email });

      return findUser(userQuery);
   }
   else {
      return Promise.reject(new CustomError("WrongEMail", {
         message: "Please provide a correct E-Mail.",
         key: "email"
      }));
   }
};

/**
 * @public
 * @function authenticateUser
 * @description looks for the user and compares the password
 * @param {object} credentials - login credentials
 * @returns {Promise} of authenticated user
 */
const authenticateUser = (credentials) => {
   return findUserByEMail(credentials.email).then(knownUser => {
      return knownUser.comparePassword(credentials.password);
   });
};

/**
 * @public
 * @function updateResetPwdTokenInUser
 * @description updates the reset password token for user with the given id
 * @param {string} resetPasswordToken - token for resetting the password
 * @param {id} userId - id of user
 * @returns {Promise} of updated user
 */
const updateResetPwdTokenInUser = (resetPasswordToken, userId) => {
   const set = {
      resetPasswordToken
   };
   return userModel.findByIdAndUpdate(userId, { $set: set })
      .exec().catch(convertMongooseError);
};

/**
 * @public
 * @function updatePasswordAndTokenInUser
 * @description resets the reset password token and changes the password for user with the given id
 * @param {string} password - new password
 * @param {string} resetPasswordToken - token for resetting the password
 * @param {object} user - user to update
 * @returns {Promise} of updated user
 */
const updatePasswordAndTokenInUser = (password, resetPasswordToken, user) => {
   if (user.resetPasswordToken === resetPasswordToken) {
      const set = {
         password,
         resetPasswordToken: ""
      };
      return userModel.findByIdAndUpdate(user.id, { $set: set })
         .exec().catch(convertMongooseError);
   }
   else {
      return Promise.reject(new CustomError("OneTimeJwt", {
         message: "You already changed your password from this email.",
         key: "email"
      }));
   }
};

export {
   findUserByEMail,
   authenticateUser,
   updateResetPwdTokenInUser,
   updatePasswordAndTokenInUser,
};