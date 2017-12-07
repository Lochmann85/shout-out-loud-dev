import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   createAccountConfirmation
} from './../../mongoDbApi/services/accountConfirmation/accountConfirmationDbService';

const types = `
input NewAccount {
   email: String
   name: String
   password: String
}
`;

const mutations = `
signup(newAccount: NewAccount): Boolean!
`;

const _mutationsResolver = {
   Mutation: {
      signup(_, { newAccount }, { tokenHandler }) {
         return createAccountConfirmation(newAccount, tokenHandler)
            .then(() => true);
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
   addResolveFunctionsToSchema(executableSchema, _mutationsResolver);
};

export {
   types,
   mutations,
   addResolversTo,
};