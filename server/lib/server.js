import { serverConfig } from './configurations';

import { initializeMongoDb } from './mongoDbApi/mongoDbService';

import { buildSchema } from './graphQLApi/schema/graphQLSchemaBuilder';

import { initializeGraphQLService } from './graphQLApi/graphQLService';
import { initializeSubscriptionService } from './graphQLApi/subscriptionService';

import { startTimer } from './infiniteTimerApi/infiniteTimerService';

initializeMongoDb(serverConfig)
   .then(buildSchema)
   .then(() => {
      return initializeGraphQLService(serverConfig);
   })
   .then(() => {
      return initializeSubscriptionService(serverConfig);
   })
   .then(() => {
      return startTimer();
   }).catch(error => console.log(error));