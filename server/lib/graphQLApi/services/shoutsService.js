import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   storeUpdater
} from './../../storageApi/storageService';
import {
   findAllShouts
} from './../../mongoDbApi/services/shout/shoutDbService';

import subscriptionHandler from './../../graphQLApi/subscription/subscriptionHandler';

const types = `
type Shout {
   id: ID!
   message: String!
   type: String!
   user: User!
   createdAt: String!
}
input ShoutInput {
   message: String
}
`;

const queries = `
getShoutsQueue: [Shout]!
getCurrentShout: Shout
`;

const _queriesResolver = {
   Query: {
      getShoutsQueue() {
         return findAllShouts();
      },
      getCurrentShout() {
         return storeUpdater.getCurrentShownShout();
      }
   }
};

const mutations = `
pushShout(shout: ShoutInput): Boolean
`;

const _mutationsResolver = {
   Mutation: {
      pushShout(_, { shout }, { viewer }) {
         shout.user = viewer.id;
         return storeUpdater.enqueue(shout);
      },
   }
};

const subscriptions = `
shoutsQueueChanged: [Shout]!
currentShoutChanged: Shout
`;

const _subscriptionResolver = {
   Subscription: {
      shoutsQueueChanged: {
         resolve: payload => payload,
         subscribe: () => subscriptionHandler.asyncIterator("shoutsQueueChangedChannel"),
      },
      currentShoutChanged: {
         resolve: payload => payload,
         subscribe: () => subscriptionHandler.asyncIterator("currentShoutChangedChannel"),
      },
   }
};

/**
 * @public
 * @function addResolversTo
 * @description adds the resolvers to the executable schema
 * @param {any} executableSchema - the executable schema
 */
const addResolversTo = (executableSchema) => {
   addResolveFunctionsToSchema(executableSchema, _queriesResolver);
   addResolveFunctionsToSchema(executableSchema, _mutationsResolver);
   addResolveFunctionsToSchema(executableSchema, _subscriptionResolver);
};

export {
   types,
   queries,
   mutations,
   subscriptions,
   addResolversTo,
};