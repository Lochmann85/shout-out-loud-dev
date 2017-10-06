import { initializeDbModels } from './models';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

/**
 * @public
 * @function initializeMongoDb
 * @description Initializes the connection to the mongoDb
 * @param {object} config - server configuration
 * @returns {Promise} of initialization
 */
const initializeMongoDb = (config) => {
   return new Promise((resolve, reject) => {
      mongoose.createConnection(config.MONGODB_URI, {
         useMongoClient: true
      }).then(connection => {
         initializeDbModels(connection);
      }).then(() => {
         console.log(`Connected to mongoDb on ${config.MONGODB_URI}`); // eslint-disable-line no-console
         resolve();
      }).catch(reject);
   });
};

export {
   initializeMongoDb
};