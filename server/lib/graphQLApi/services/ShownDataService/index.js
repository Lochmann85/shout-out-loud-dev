import { addResolveFunctionsToSchema } from 'graphql-tools';

const types = `
      type ShownData {
         value: Float!
      }
   `;

const queries = `
      getShownData: String
 `;

const _queriesResolver = {
   Query: {
      getShownData() {
         return "test";
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