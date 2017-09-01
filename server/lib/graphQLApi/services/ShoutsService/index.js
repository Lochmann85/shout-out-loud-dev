import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   currentShownShout,
   shownShoutsQueue,
   pendingShoutsQueue
} from './../../../storageApi';
import { CustomShout } from './../../../shoutApi';
import subscriptionHandler from './../../../graphQLApi/subscription/subscriptionHandler';

const types = `
type Shout {
   message: String!
   type: String!
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
         return shownShoutsQueue.asArray();
      },
      getCurrentShout() {
         return currentShownShout;
      }
   }
};

const mutations = `
pushShout(shout: ShoutInput!): Boolean
`;

const _mutationsResolver = {
   Mutation: {
      pushShout(_, { shout }) {
         return new Promise((resolve, reject) => {
            if (shout && shout.message) {
               pendingShoutsQueue.enqueue(new CustomShout(shout));
               resolve(true);
            }
            else {
               reject(`Please enter a message`);
            }
         });
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
         resolve: payload => payload.asArray(),
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