import { MAX_SHOWN_SHOUTS } from './../configurations';

/**
 * @public
 * @function ShownShoutsQueue
 * @description class for shown shouts queue
 */
class ShownShoutsQueue {

   /**
    * @public
    * @function constructor
    * @description initializes the array
    * @param {object} pendingShoutsQueue - the queue for the pending shouts
    */
   constructor(pendingShoutsQueue) {
      this._pendingShoutsQueue = pendingShoutsQueue;
      this._array = new Array(MAX_SHOWN_SHOUTS);
   }

   /**
    * @public
    * @function cycle
    * @description cycles the fixed size shown shouts queue
    */
   cycle() {
      const shout = this._pendingShoutsQueue.dequeue();
      this._baseCycle(shout);
   }

   /**
    * @private
    * @function _baseCycle
    * @description the basic cycle functionality
    * @param {object} shout - new entered shout
    */
   _baseCycle(shout) {
      this._array.push(shout);
      this._array.shift();
   }

   /**
    * @public
    * @function asArray
    * @description returns the shown shouts as array
    */
   asArray() {
      return this._array;
   }
};

export default ShownShoutsQueue;