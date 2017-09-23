import Queue from './Queue';
import subscriptionHandler from './../graphQLApi/subscription/subscriptionHandler';
import { shoutModel } from './../mongoDbApi/models';

import {
   cycle,
   alterShoutInput
} from './../mongoDbApi/services/shout/shoutDbService';

class StoreUpdater {

   constructor(pendingShoutsQueue) {
      this._pendingShoutsQueue = new Queue();
      this._currentShownShout = shoutModel.getEmptyShout();
   }

   /**
    * @public
    * @function update
    * @description updates the store of the shouts. Looks for new shouts and adds them to the queue if possible
    * @returns {Promise} of updating
    */
   update() {
      return new Promise((resolve, reject) => {
         if (this._pendingShoutsQueue.hasAnItem()) {
            if (this._currentShownShout.shouldBeShown) {
               subscriptionHandler.publish("shoutsQueueChangedChannel", cycle(this._currentShownShout));
            }
            this._currentShownShout = this._pendingShoutsQueue.dequeue();
            subscriptionHandler.publish("currentShoutChangedChannel", this._currentShownShout);
         }
         else {
            if (this._currentShownShout.shouldBeShown) {
               subscriptionHandler.publish("shoutsQueueChangedChannel", cycle(this._currentShownShout));

               this._currentShownShout = shoutModel.getEmptyShout();
               subscriptionHandler.publish("currentShoutChangedChannel", this._currentShownShout);
            }
         }
         resolve();
      });
   }

   /**
    * @public
    * @function enqueue
    * @description enqueues the next shout
    * @param {object} shoutData - shout to enqueue
    * @returns {Promise} pending shout queue
    */
   enqueue = (shoutData) => {
      return alterShoutInput(shoutData).then(alteredShout => {
         return this._pendingShoutsQueue.enqueue(alteredShout);
      });
   }

   /**
    * @public
    * @function getCurrentShownShout
    * @description getter for the current shown shout skeleton
    * @returns {object} current shown shout
    */
   getCurrentShownShout = () => {
      return this._currentShownShout;
   }
};

export default StoreUpdater;