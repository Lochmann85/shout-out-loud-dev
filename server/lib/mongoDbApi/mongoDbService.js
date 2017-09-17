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
   const mongoDbUrl = `mongodb://${config.MONGO_USER_NAME}:${config.MONGO_USER_PWD}@${config.MONGO_DB_URI}:27017/${config.MONGO_DB_NAME}`;

   return new Promise((resolve, reject) => {
      mongoose.createConnection(mongoDbUrl, {
         useMongoClient: true
      }).then(connection => {
         initializeDbModels(connection);
      }).then(() => {
         console.log(`Connected to mongoDb on ${config.MONGO_DB_URI}:27017`); // eslint-disable-line no-console
         resolve();
      }).catch(reject);
   });
};

export {
   initializeMongoDb
};