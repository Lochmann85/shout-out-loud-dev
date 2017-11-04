import BaseChecker from './BaseChecker';

class NotOwnRoleChecker extends BaseChecker {

   /**
    * @protected
    * @function _internalCheck
    * @description the internal check of the inherited class
    * @param {object} args - the args of the request
    * @param {object} viewer - the user model of the viewer
    * @returns {bool} of permission
    */
   _internalCheck(args, viewer) {
      return args.roleId !== viewer.role.id;
   }
};

export default NotOwnRoleChecker;