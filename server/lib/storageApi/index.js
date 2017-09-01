import ShownShoutsQueue from './ShownShoutsQueue';
import BaseQueue from './BaseQueue';
import StoreUpdater from './StoreUpdater';
import { EmptyShout } from './../shoutApi';

const pendingShoutsQueue = new BaseQueue();

const shownShoutsQueue = new ShownShoutsQueue();

const currentShownShout = new EmptyShout();

const storeUpdater = new StoreUpdater(pendingShoutsQueue, shownShoutsQueue, currentShownShout);

export {
   currentShownShout,
   shownShoutsQueue,
   pendingShoutsQueue,
   storeUpdater
};