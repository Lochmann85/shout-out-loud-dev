/**
 * @public
 * @function BaseQueue
 * @description base class for a queue
 */
class BaseQueue {

   /**
    * @public
    * @function constructor
    * @description initializes the basic array
    */
   constructor() {
      this._array = [];
   }

   /**
    * @public
    * @function enqueu
    * @description enqueues the next item
    * @param {object} item - item to enqueue
    * @returns {object} this
    */
   enqueue(item) {
      this._array.push(item);
      return this;
   }

   /**
    * @public
    * @function dequeue
    * @description dequeues the first item and shifts the rest
    * @returns {object} the dequeued item
    */
   dequeue() {
      return this._array.shift();
   }

   /**
    * @public
    * @function size
    * @returns {number} the length of the array
    */
   get size() {
      return this._array.length;
   }
};

export default BaseQueue;