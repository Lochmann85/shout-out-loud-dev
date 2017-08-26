import ShownShoutsQueue from './ShownShoutsQueue';
import BaseQueue from './BaseQueue';

const pendingShoutsQueue = new BaseQueue();

const shownShoutsQueue = new ShownShoutsQueue(pendingShoutsQueue);

export {
   shownShoutsQueue,
   pendingShoutsQueue
};