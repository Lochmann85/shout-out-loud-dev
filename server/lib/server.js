import { serverConfig } from './configurations';

import { initializeMongoDb } from './mongoDbApi/mongoDbService';
import { initializeStoreUpdater } from './storageApi/storageService';

import { buildSchema } from './graphQLApi/schema/graphQLSchemaBuilder';

import { initializeGraphQLService } from './graphQLApi/graphQLService';
import { initializeSubscriptionService } from './graphQLApi/subscriptionService';

import { initializeEMailTransport } from './sendEMailApi/sendEMailService';

import { startTimer } from './infiniteTimerApi/infiniteTimerService';

initializeMongoDb(serverConfig)
   .then(initializeStoreUpdater)
   .then(buildSchema)
   .then(() => {
      return initializeGraphQLService(serverConfig);
   })
   .then(() => {
      return initializeSubscriptionService(serverConfig);
   })
   .then(() => {
      return initializeEMailTransport(serverConfig);
   })
   .then(() => {
      return startTimer();
   }).catch(error => console.log(error));