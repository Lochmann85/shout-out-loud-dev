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

/**
 * @public
 * @function addResolversTo
 * @description adds the resolvers to the executable schema
 * @param {any} executableSchema - the executable schema
 */
const addResolversTo = (executableSchema) => {
   addResolveFunctionsToSchema(executableSchema, _queriesResolver);
};

export {
   types,
   queries,
   addResolversTo,
};