import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   createAccountConfirmation
} from './../../mongoDbApi/services/accountConfirmation/accountConfirmationDbService';
import {
   signupTemplate,
   sendEMail
} from './../../sendEMailApi/sendEMailService';

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
            .then(accountConfirmation => {
               return sendEMail(signupTemplate, accountConfirmation);
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
   addResolveFunctionsToSchema(executableSchema, _mutationsResolver);
};

export {
   types,
   mutations,
   addResolversTo,
};