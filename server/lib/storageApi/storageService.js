import StoreUpdater from './StoreUpdater';

let storeUpdater;

/**
 * @public
 * @function initializeStoreUpdater
 * @description store updater needs to be initialized after the models
 */
const initializeStoreUpdater = () => {
   storeUpdater = new StoreUpdater();
};

export {
   initializeStoreUpdater,
   storeUpdater
};