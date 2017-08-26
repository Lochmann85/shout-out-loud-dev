import { addResolveFunctionsToSchema } from 'graphql-tools';

import { shownShoutsQueue, pendingShoutsQueue } from './../../../storageApi';

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
getShoutsQueue: [Shout!]!
`;

const _queriesResolver = {
   Query: {
      getShoutsQueue() {
         return shownShoutsQueue.asArray();
      },
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
               shout.type = "Custom";
               pendingShoutsQueue.enqueue(shout);
               resolve(true);
            }
            else {
               reject(`Please enter a message`);
            }
         });
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
};

export {
   types,
   queries,
   mutations,
   addResolversTo,
};