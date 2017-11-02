
class BaseChecker {
   constructor(predecessor, relation) {
      this._predecessor = predecessor || null;
      this._relation = this[`_${relation}`] || null;
   }

   /**
    * @private
    * @function _and
    * @description and combines two checker
    * @param {object} args - the args of the request
    * @param {object} viewer - the user model of the viewer
    * @returns {bool} of permission
    */
   _and(args, viewer) {
      return this._internalCheck(args, viewer) &&
         this._predecessor.check(args, viewer);
   }

   /**
    * @public
    * @function and
    * @description and setter for the succeeding checker
    * @param {object} SuccessorClass - the successor class checker
    */
   and(SuccessorClass) {
      const successor = new SuccessorClass(this, "and");
      return successor;
   }

   /**
    * @private
    * @function _or
    * @description or combines two checker
    * @param {object} args - the args of the request
    * @param {object} viewer - the user model of the viewer
    * @returns {bool} of permission
    */
   _or(args, viewer) {
      return this._internalCheck(args, viewer) ||
         this._predecessor.check(args, viewer);
   }

   /**
    * @public
    * @function or
    * @description or setter for the succeeding checker
    * @param {object} SuccessorClass - the successor class checker
    */
   or(SuccessorClass) {
      const successor = new SuccessorClass(this, "or");
      return successor;
   }

   /**
    * @private
    * @function check
    * @description starts the check for the authorization
    * @param {object} args - the args of the request
    * @param {object} viewer - the user model of the viewer
    * @returns {bool} of permission
    */
   check(args, viewer) {
      if (this._predecessor) {
         return this._relation(args, viewer);
      }
      else {
         return this._internalCheck(args, viewer);
      }
   }

   /**
    * @protected
    * @function _internalCheck
    * @description the internal check of the inherited class
    * @param {object} args - the args of the request
    * @param {object} viewer - the user model of the viewer
    * @returns {bool} of permission
    */
   _internalCheck(args, viewer) {
      throw new Error("FATAL ERROR: inherited class needs to implement _internalCheck.");
   }
};

export default BaseChecker;