import { storeUpdater } from './../storageApi/storageService';

import { TIMER_INTERVAL } from './../configurations';

/**
 * @private
 * @function _timeStep
 * @description the time step in which the timer cycles the shown shouts
 */
const _timeStep = () => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         storeUpdater.update()
            .then(resolve)
            .catch(reject);
      }, TIMER_INTERVAL);
   });
};

/**
 * @public
 * @function startTimer
 * @description starts the timer for reading the values
 */
const startTimer = () => {
   return _timeStep().then(() => {
      return startTimer();
   });
};

export {
   startTimer
};