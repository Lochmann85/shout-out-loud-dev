import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   findAllRules,
} from './../../mongoDbApi/services/rule/ruleDbService';
import {
   authorizationMiddleware,
   ReadRoleChecker
} from './../../authorizationApi/authorizationService';

const readRole = new ReadRoleChecker();

const types = `
type Rule {
   id: ID!
   name: String!
}`;

const queries = `
getAllRules: [Rule!]
`;

const _queriesResolver = {
   Query: {
      getAllRules: authorizationMiddleware(readRole)(() => {
         return findAllRules();
      })
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