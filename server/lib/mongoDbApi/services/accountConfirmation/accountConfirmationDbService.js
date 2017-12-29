import {
   userModel,
   accountConfirmationModel
} from './../../models';

import { findDefaultRole } from './../role/roleDbService';

import convertMongooseError from './../../convertMongooseToReadableError';

/**
 * @public
 * @function findAccountConfirmation
 * @description finds the account confirmation with the given id
 * @param {id} accountConfirmationId - id of account confirmation
 * @returns {Promise} of found account confirmation
 */
const findAccountConfirmation = (accountConfirmationId) => {
   return accountConfirmationModel.findById(accountConfirmationId)
      .catch(convertMongooseError);
};

/**
 * @private
 * @function _handleError
 * @description handles the validation error
 * @param {object} errors - the errors object mongoose conform
 * @returns {Promise} of rejected errors
 */
const _handleError = (errors) => {
   if (Object.keys(errors).length !== 0) {
      const error = { errors };
      return Promise.reject(error);
   }
   else {
      return Promise.resolve(true);
   }
};

/**
 * @public
 * @function createAccountConfirmation
 * @description creates a new account that is not active
 * @param {object} newAccount - the new account data
 * @param {object} tokenHandler - the token handler
 * @returns {Promise} of created user
 */
const createAccountConfirmation = (newAccount, tokenHandler) => {
   const errors = {};
   let accountConfirmation = null;

   if (newAccount.email) {
      newAccount.email = newAccount.email.toLowerCase();
   }

   return userModel.find({ $or: [{ email: newAccount.email }, { name: newAccount.name }] })
      .then(users => {
         if (users.findIndex(user => user.email === newAccount.email) > -1) {
            errors.email = {
               message: "There already exists a user with the given email."
            };
         }
         if (users.findIndex(user => user.name === newAccount.name) > -1) {
            errors.name = {
               message: "There already exists a user with the given name."
            };
         }

         accountConfirmation = new accountConfirmationModel(newAccount); // eslint-disable-line new-cap

         return tokenHandler.encrypt(accountConfirmation);
      })
      .then(jwtToken => {
         accountConfirmation.confirmAccountToken = jwtToken;

         return accountConfirmation.validate()
            .catch(error => {
               Object.assign(errors, error.errors);
               return _handleError(errors);
            });
      })
      .then(() => {
         return _handleError(errors);
      })
      .then(() => {
         return accountConfirmation.save();
      })
      .catch(convertMongooseError);
};

/**
 * @public
 * @function deleteAccountConfirmation
 * @description deletes the account confirmation with the given id
 * @param {id} accountConfirmationId - id of account confirmation
 * @returns {Promise} of deleted account confirmation
 */
const deleteAccountConfirmation = (accountConfirmationId) => {
   return accountConfirmationModel.findByIdAndRemove(accountConfirmationId)
      .catch(convertMongooseError);
};

/**
 * @public
 * @function createUserFromAccountConfirmation
 * @description creates a user from the account confirmation data
 * @param {object} accountConfirmation - account confirmation
 * @returns {Promise} of user
 */
const createUserFromAccountConfirmation = (accountConfirmation) => {
   return findDefaultRole()
      .then(defaultRole => {
         const { email, name, password } = accountConfirmation;
         const newUser = {
            email,
            name,
            password,
            role: defaultRole.id
         };
         return newUser;
      })
      .then(newUser => {
         return deleteAccountConfirmation(accountConfirmation.id)
            .then(() => newUser);
      })
      .then(newUser => {
         const user = new userModel(newUser); // eslint-disable-line new-cap
         return user.save();
      })
      .catch(convertMongooseError);
};

export {
   findAccountConfirmation,
   createAccountConfirmation,
   deleteAccountConfirmation,
   createUserFromAccountConfirmation,
};