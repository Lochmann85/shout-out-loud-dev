import { userModel } from './../../models';

import { findUser } from './userDbService';

/**
 * @public
 * @function authenticateUser
 * @description looks for the user and compares the password
 * @param {object} credentials - login credentials
 * @returns {Promise} of authenticated user
 */
const authenticateUser = (credentials) => {
   const userQuery = userModel.findOne({ name: credentials.name });

   return findUser(userQuery).then(knownUser => {
      return knownUser.comparePassword(credentials.password);
   });
};

export {
   authenticateUser
};