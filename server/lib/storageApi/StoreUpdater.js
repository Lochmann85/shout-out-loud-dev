import subscriptionHandler from './../graphQLApi/subscription/subscriptionHandler';
import { EmptyShout } from './../shoutApi';

class StoreUpdater {

   constructor(pendingShoutsQueue, shownShoutsQueue, currentShownShout) {
      this._pendingShoutsQueue = pendingShoutsQueue;
      this._shownShoutsQueue = shownShoutsQueue;
      this._currentShownShout = currentShownShout;
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
            if (this._currentShownShout.shouldBeShown()) {
               this._shownShoutsQueue.cycle(this._currentShownShout);
               subscriptionHandler.publish("shoutsQueueChangedChannel", this._shownShoutsQueue);
            }
            this._currentShownShout = this._pendingShoutsQueue.dequeue();
            subscriptionHandler.publish("currentShoutChangedChannel", this._currentShownShout);
         }
         else {
            if (this._currentShownShout.shouldBeShown()) {
               this._shownShoutsQueue.cycle(this._currentShownShout);
               subscriptionHandler.publish("shoutsQueueChangedChannel", this._shownShoutsQueue);

               this._currentShownShout = new EmptyShout();
               subscriptionHandler.publish("currentShoutChangedChannel", this._currentShownShout);
            }
         }
         resolve();
      });
   }
};

export default StoreUpdater;