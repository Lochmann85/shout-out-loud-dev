import Configurations from './../Configurations';

/**
 * @public
 * @function ShownShoutsQueue
 * @description class for shown shouts queue
 */
class ShownShoutsQueue {

   constructor(pendingShoutsQueue) {
      this._pendingShoutsQueue = pendingShoutsQueue;
      this._array = new Array(Configurations.MAX_SHOWN_SHOUTS);
   }

   cycle() {
      const shout = this._pendingShoutsQueue.dequeue();
      this._baseCycle(shout);
   }

   _baseCycle(shout) {
      this._array.push(shout);
      this._array.shift();
   }

   asArray() {
      return this._array;
   }
};

export default ShownShoutsQueue;