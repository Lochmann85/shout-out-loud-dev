import { addResolveFunctionsToSchema } from 'graphql-tools';

import { CustomError } from './../../errorsApi';
import { GraphQLTokenHandler } from './../../jwtApi/jwtService';
import {
   createAccountConfirmation,
   findAccountConfirmation,
   createUserFromAccountConfirmation,
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

const queries = `
signupConfirmation(signupToken: String!): String!
`;

const mutations = `
signup(newAccount: NewAccount): Boolean!
`;

const _queriesResolver = {
   Query: {
      signupConfirmation(_, { signupToken }, { tokenHandler }) {
         return tokenHandler.validate(signupToken)
            .then(tokenData => {
               return findAccountConfirmation(tokenData.userId);
            })
            .then(accountConfirmation => {
               if (accountConfirmation) {
                  return createUserFromAccountConfirmation(accountConfirmation);
               }
               else {
                  return Promise.reject(new CustomError("SignupConfirmation", {
                     message: "The signup E-Mail is expired. Please try again.",
                     key: "token"
                  }));
               }
            })
            .then(user => {
               const tokenHandler = new GraphQLTokenHandler();
               return tokenHandler.encrypt(user);
            });
      }
   }
};

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
   addResolveFunctionsToSchema(executableSchema, _queriesResolver);
   addResolveFunctionsToSchema(executableSchema, _mutationsResolver);
};

export {
   types,
   queries,
   mutations,
   addResolversTo,
};