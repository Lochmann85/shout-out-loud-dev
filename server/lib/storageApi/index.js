import ShownShoutsQueue from './ShownShoutsQueue';
import BaseQueue from './BaseQueue';

const shownShoutsQueue = new ShownShoutsQueue();

const pendingShoutsQueue = new BaseQueue();

export {
   shownShoutsQueue,
   pendingShoutsQueue
};