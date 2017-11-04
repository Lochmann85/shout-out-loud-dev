import BaseChecker from './BaseChecker';

import { ForbiddenError } from './../../errorsApi';

class NotOwnRoleChecker extends BaseChecker {

   /**
    * @protected
    * @function _internalCheck
    * @description the internal check of the inherited class
    * @param {object} args - the args of the request
    * @param {object} viewer - the user model of the viewer
    * @returns {Promise} of permission
    */
   _internalCheck(args, viewer) {
      return new Promise((resolve, reject) => {
         if (args.roleId !== viewer.role.id) {
            resolve(true);
         }
         else {
            reject(new ForbiddenError());
         }
      });
   }
};

export default NotOwnRoleChecker;