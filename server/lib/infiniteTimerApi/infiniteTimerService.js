import { shownShoutsQueue } from './../storageApi';

import Configurations from './../Configurations';

/**
 * @private
 * @function _timeStep
 * @description the time step in which the timer cycles the shown shouts
 */
const _timeStep = () => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         shownShoutsQueue.cycle();
         resolve();
      }, Configurations.TIMER_INTERVAL);
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