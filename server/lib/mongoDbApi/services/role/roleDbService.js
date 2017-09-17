import { roleModel } from './../../models';
import convertMongooseError from './../../convertMongooseToReadableError';
import {
   CustomError,
   MongooseSingleError
} from './../../../errorsApi';
import { updateUsers } from './../user/userDbService';

/**
 * @private
 * @member staticRoleError
 * @description error for static roles
 */
const staticRoleError = new CustomError("StaticRole", {
   message: "The static role cannot be changed.",
   key: ""
});

/**
 * @public
 * @function findAllRoles
 * @description looks for all roles
 * @returns {Promise} of roles
 */
const findAllRoles = () => {
   return roleModel.find().exec()
      .catch(error => new MongooseSingleError(error));
};

/**
 * @private
 * @function _findRole
 * @description searches a role from the given mongoose query
 * @param {obejct} mongooseQuery - the query for the user
 * @returns {Promise} of known user
 */
const _findRole = (mongooseQuery) => {
   return new Promise((resolve, reject) => {
      mongooseQuery.exec().then(knownRole => {
         if (knownRole) {
            resolve(knownRole);
         }
         else {
            reject(new CustomError("UnknownRole", {
               message: "Role not known.",
               key: "name"
            }));
         }
      }).catch(error => reject(new MongooseSingleError(error)));
   });
};

/**
 * @public
 * @function findRoleById
 * @description looks for the role for the given id
 * @param {string} roleId - role id
 * @returns {Promise} of role
 */
const findRoleById = (roleId) => {
   const roleQuery = roleModel.findById(roleId);

   return _findRole(roleQuery);
};

/**
 * @public
 * @function createRole
 * @description creates a new role
 * @param {object} roleData - data for the new role
 * @returns {Promise} of new role
 */
const createRole = (roleData) => {
   return roleModel.buildRoleWithRules(roleData).then(newRole => {
      return newRole.save().catch(convertMongooseError);
   });
};

/**
 * @public
 * @function updateRole
 * @description update the rolename
 * @param {object} roleData - data, to update the role
 * @returns {Promise} of updated role
 */
const updateRole = (roleData, roleId) => {
   const set = {
      name: roleData.name
   };
   return findRoleById(roleId).then(role => {
      if (role.isStatic) {
         return Promise.reject(staticRoleError);
      }
      else {
         return roleModel.findByIdAndUpdate(roleId, { $set: set })
            .exec().catch(convertMongooseError);
      }
   });
};

/**
 * @private
 * @function _updateRelatedUser
 * @description changes the role of the users to the default one
 * @param {object} role - role
 * @returns {Promise} of default role
 */
const _updateRelatedUser = (role) => {
   const roleQuery = roleModel.findOne({ name: "LicenceUser" });

   return _findRole(roleQuery).then(defaultRole => {
      const searchParams = { role: role.id },
         set = { role: defaultRole.id };
      return updateUsers(searchParams, set).then(() => defaultRole);
   });
};

/**
 * @public
 * @function deleteRole
 * @description deletes the role with the given id
 * @param {id} roleId - id of role
 * @returns {Promise} of default role
 */
const deleteRole = (roleId) => {
   return findRoleById(roleId).then(role => {
      if (role.isStatic) {
         return Promise.reject(staticRoleError);
      }
      else {
         return roleModel.findByIdAndRemove(roleId).exec().then(role => {
            if (role) {
               return _updateRelatedUser(role);
            }
            else {
               return Promise.reject({
                  errors: [{ message: `Could not find role to delete` }]
               });
            }
         }).catch(error => convertMongooseError(error));
      }
   });
};

export {
   findAllRoles,
   findRoleById,
   createRole,
   updateRole,
   deleteRole,
};