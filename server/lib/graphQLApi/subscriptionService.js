import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { appServer } from './graphQLService';
import executable from './schema/executableSchema';

let subscriptionServer = null;

/**
 * @public
 * @function initializeSubscriptionService
 * @description Initializes the Subscription server
 * @param {object} serverConfig - configuration of server
 * @returns {Promise} of initialization
 */
const initializeSubscriptionService = (serverConfig) => {
   return new Promise((resolve, reject) => {

      const graphQlServer = createServer(appServer);

      subscriptionServer = SubscriptionServer.create(
         {
            schema: executable.schema,
            execute,
            subscribe,
         },
         {
            server: graphQlServer,
            path: "/graphql",
         },
      );

      graphQlServer.listen(serverConfig.PORT, () => {
         console.log(`WebSocket Server is now running on ws://0.0.0.0:${serverConfig.PORT}/graphql`); // eslint-disable-line no-console

         resolve();
      });
   });
};

export {
   subscriptionServer,
   initializeSubscriptionService,
};