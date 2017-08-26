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

   cycle(shout) {
      if (shout) {
         if (this._numberOfShouts < MAX_SHOWN_SHOUTS) {
            ++this._numberOfShouts;
         }
      }
      else {
         if (this._numberOfShouts > 0) {
            --this._numberOfShouts;
         }
      }
      this._array.push(shout);
      return this._array.shift();
   }

   asArray() {
      return this._array;
   }
};

export default ShownShoutsQueue;