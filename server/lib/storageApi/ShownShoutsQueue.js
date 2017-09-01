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
    */
   constructor() {
      this._array = [];
      for (let index = 0; index < MAX_SHOWN_SHOUTS; ++index) {
         this._array.push(null);
      }
   }

   /**
    * @public
    * @function cycle
    * @description cycles the fixed size shown shouts queue
    * @param {object} shout - new shout to push front
    */
   cycle(shout) {
      this._array.unshift(shout);
      this._array.pop();
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