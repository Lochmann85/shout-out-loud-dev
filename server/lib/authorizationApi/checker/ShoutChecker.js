import BaseChecker from './BaseChecker';

class ShoutChecker extends BaseChecker {

   /**
    * @protected
    * @function _internalCheck
    * @description the internal check of the inherited class
    * @param {object} args - the args of the request
    * @param {object} viewer - the user model of the viewer
    * @returns {Promise} of permission
    */
   _internalCheck(args, viewer) {
      return viewer.has("shout");
   }
};

export default ShoutChecker;