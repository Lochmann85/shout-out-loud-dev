import { userModel } from './../../models';

import convertMongooseError from './../../convertMongooseToReadableError';

import {
   CustomError,
   MongooseSingleError
} from './../../../errorsApi';

/**
 * @public
 * @function findUser
 * @description searches a user from the given mongoose query
 * @param {obejct} mongooseQuery - the query for the user
 * @returns {Promise} of known user
 */
const findUser = (mongooseQuery) => {
   return new Promise((resolve, reject) => {
      mongooseQuery.exec().then(knownUser => {
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
   const userQuery = userModel.findById(userId).populate("role");

   return findUser(userQuery);
};

/**
 * @public
 * @function findAllUsers
 * @description looks for all users
 * @returns {Promise} of users
 */
const findAllUsers = () => {
   return userModel.find().populate("role").exec()
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
   const user = new userModel(userData); // eslint-disable-line new-cap

   return user.save().then(newUser => new Promise((resolve, reject) => {
      newUser.populate("role", (error, populatedUser) => {
         if (error) {
            convertMongooseError(error).catch(reject);
         }
         else {
            resolve(populatedUser);
         }
      });
   })).catch(convertMongooseError);
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
      email: userData.email,
      name: userData.name
   };
   if (userData.role) {
      set.role = userData.role;
   }
   return userModel.findByIdAndUpdate(userId, { $set: set })
      .populate("role").exec().catch(convertMongooseError);
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
   return userModel.findByIdAndRemove(userId)
      .populate("role").exec()
      .then(user => {
         if (user) {
            return user;
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