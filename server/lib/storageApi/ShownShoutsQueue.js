const MAX_SHOWN_SHOUTS = 5;

/**
 * @public
 * @function ShownShoutsQueue
 * @description class for shown shouts queue
 */
class ShownShoutsQueue {

   constructor() {
      this._array = new Array(MAX_SHOWN_SHOUTS);
      this._numberOfShouts = 0;
   }

   cycle(item) {
      this._array.push(item);
      return this._array.shift();
   }

   asArray() {
      return this._array;
   }
};

export default ShownShoutsQueue;