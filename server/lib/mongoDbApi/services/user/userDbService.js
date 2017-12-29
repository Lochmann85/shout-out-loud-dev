import { userModel } from './../../models';

import convertMongooseError from './../../convertMongooseToReadableError';

import {
   CustomError,
   MongooseSingleError
} from './../../../errorsApi';
import { removeShoutsOfUser } from './../shout/shoutDbService';
import { storeUpdater } from './../../../storageApi/storageService';


/**
 * @private
 * @function _populated
 * @description adds the needed user population
 * @returns {Promise} of mongoose query
 */
const _populated = (query) => {
   return query.populate("role")
      .populate({ path: "role", populate: { path: "rules" } })
      .exec();
};

/**
 * @public
 * @function findUser
 * @description searches a user from the given mongoose query
 * @param {obejct} mongooseQuery - the query for the user
 * @returns {Promise} of known user
 */
const findUser = (mongooseQuery) => {
   return new Promise((resolve, reject) => {
      _populated(mongooseQuery).then(knownUser => {
         if (knownUser) {
            resolve(knownUser);
         }
         else {
            reject(new CustomError("UnknownUser", {
               message: "User not known.",
               key: "name"
            }));
         }
      }).catch(error => reject(new MongooseSingleError(error)));
   });
};

/**
 * @public
 * @function findUserById
 * @description looks for the user for the given id
 * @param {string} userId - user id
 * @returns {Promise} of user
 */
const findUserById = (userId) => {
   const userQuery = userModel.findById(userId);

   return findUser(userQuery);
};

/**
 * @public
 * @function findAllUsers
 * @description looks for all users
 * @returns {Promise} of users
 */
const findAllUsers = () => {
   return _populated(userModel.find())
      .catch(error => new MongooseSingleError(error));
};

/**
 * @public
 * @function createUser
 * @description creates a new user
 * @param {object} userData - data for the new user
 * @returns {Promise} of new user
 */
const createUser = (userData) => {
   if (userData.email) {
      userData.email = userData.email.toLowerCase();
   }
   const user = new userModel(userData); // eslint-disable-line new-cap

   return user.saveWithHashedPassword().then(newUser => {
      return findUserById(newUser.id);
   }).catch(convertMongooseError);
};

/**
 * @public
 * @function updateUser
 * @description updates the user with the given id
 * @param {object} userData - data for the user
 * @param {id} userId - id of user
 * @returns {Promise} of updated user
 */
const updateUser = (userData, userId) => {
   const set = {
      name: userData.name
   };

   if (userData.email) {
      set.email = userData.email.toLowerCase();
   }
   if (userData.role) {
      set.role = userData.role;
   }
   return _populated(userModel.findByIdAndUpdate(userId, { $set: set }))
      .catch(convertMongooseError);
};

/**
 * @public
 * @function updateUsers
 * @description updates users with the given search object and sets the given set
 * @param {object} searchParams - params for the find
 * @param {object} set - the new set for the update
 * @returns {Promise} of updated user
 */
const updateUsers = (searchParams, set) => {
   return userModel.update(searchParams, { $set: set }, { multi: true }).exec();
};

/**
 * @public
 * @function changeUserPassword
 * @description updates users password with the given id
 * @param {object} passwordChangeData - data for the password change: oldPW, newPW and confirmPW
 * @param {id} userId - id of user
 * @returns {Boolean} if updated true
 */
const changeUserPassword = (passwordChangeData, userId) => {
   return new Promise((resolve, reject) => {
      findUserById(userId).then(user => {
         const errors = [];

         if (passwordChangeData.password === passwordChangeData.new) {
            errors.push({
               key: "new",
               message: `The new password must not be the same as the old one.`,
            });
         }

         if (passwordChangeData.new !== passwordChangeData.confirm) {
            errors.push({
               key: "confirm",
               message: `New password is not confirmed.`,
            });
         }

         user.comparePassword(passwordChangeData.password).then(validUser => {
            if (errors.length === 0) {
               userModel.findByIdAndUpdate(userId, {
                  $set: {
                     password: passwordChangeData.new,
                  }
               }).exec().then(() => resolve(true))
                  .catch(error => convertMongooseError(error).catch(reject));
            }
            else {
               reject(new CustomError("ChangePassword", errors));
            }
         }).catch(() => {
            errors.push({
               key: "password",
               message: "Please provide the correct password.",
            });
            reject(new CustomError("ChangePassword", errors));
         });
      });
   });
};

/**
 * @public
 * @function deleteUser
 * @description deletes the user with the given id
 * @param {id} userId - id of user
 * @returns {Promise} of deleted user
 */
const deleteUser = (userId) => {
   return _populated(userModel.findByIdAndRemove(userId))
      .then(user => {
         if (user) {
            storeUpdater.removeShoutsOfUser(user.id);
            return removeShoutsOfUser(user.id).then(() => user);
         }
         else {
            return Promise.reject({
               errors: [{ message: `Could not find user to delete` }]
            });
         }
      }).catch(error => convertMongooseError(error));
};

export {
   findUser,
   findUserById,
   findAllUsers,
   createUser,
   updateUser,
   updateUsers,
   changeUserPassword,
   deleteUser,
};