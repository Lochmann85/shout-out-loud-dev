import { addResolveFunctionsToSchema } from 'graphql-tools';

const shouts = [
   {
      message: "In",
      type: "Custom"
   },
   {
      message: "Your",
      type: "Custom"
   },
   {
      message: "Face",
      type: "Custom"
   }
];

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
         return shouts;
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
               shouts.push(shout);
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