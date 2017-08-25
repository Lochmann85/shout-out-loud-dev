import { buildSchema } from './graphQLApi/schema/graphQLSchemaBuilder';

import { initializeGraphQLService } from './graphQLApi/graphQLService';
import { initializeSubscriptionService } from './graphQLApi/subscriptionService';

const serverConfig = {
   OPENSHIFT_PORT: process.env.OPENSHIFT_NODEJS_PORT || 8080,
   OPENSHIFT_IP: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0"
};

buildSchema().then(() => {
   return initializeGraphQLService(serverConfig);
}).then(() => {
   return initializeSubscriptionService(serverConfig);
}).catch(error => console.log(error));