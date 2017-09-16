import { addResolveFunctionsToSchema } from 'graphql-tools';

// import {
//    roleAdministration,
// } from './../../authorizationApi/authorizationService';

// import { possibleRules } from './../../authorizationApi/possibleRules';

const types = `
type Ruleset {
   read: Boolean!
   write: Boolean!
   delete: Boolean!
}
type Rule {
   id: ID!
   name: String!
   ruleset: Ruleset!
}
input RuleData {
   name: String
   ruleset: RulesetData
}
input RulesetData {
   read: Boolean
   write: Boolean
   delete: Boolean
}`;

const queries = `
getAllRuleNames: [String!]
`;

const _queriesResolver = {
   Query: {
      getAllRuleNames: /*roleAdministration("rw")*/(() => {
         return null;
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