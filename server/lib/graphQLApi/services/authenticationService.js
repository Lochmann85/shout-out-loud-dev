import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   authenticateUser,
   findUserByEMail,
   updateResetPwdTokenInUser,
   updatePasswordAndTokenInUser,
} from './../../mongoDbApi/services/user/authenticationDbService';
import { findUserById } from './../../mongoDbApi/services/user/userDbService';
import {
   forgotPasswordTemplate,
   sendEMail
} from './../../sendEMailApi/sendEMailService';

const types = `
interface IAuthorized {
   id: ID!
   name: String!
   role: Role!
}
type Viewer implements IUser, IAuthorized {
   id: ID!
   name: String!
   token: String!
   role: Role!
}
input Credentials {
   email: String
   password: String
}
`;

const queries = `
getViewer: Viewer!
`;

const _queriesResolver = {
   Query: {
      getViewer(_, args, { viewer, tokenHandler }) {
         return tokenHandler.encrypt(viewer).then(token => {
            viewer.token = token;
            return viewer;
         });
      }
   }
};

const mutations = `
login(credentials: Credentials): Viewer!
forgotPassword(email: String): Boolean!
resetPassword(password: String, confirmation: String, resetPwdToken: String): Boolean!
`;

const _mutationsResolver = {
   Mutation: {
      login(_, { credentials }, { tokenHandler }) {
         let knownUser = null;
         return authenticateUser(credentials).then(user => {
            knownUser = user;
            return tokenHandler.encrypt(knownUser);
         }).then(token => {
            return {
               id: knownUser.id,
               token
            };
         });
      },
      forgotPassword(_, { email }, { tokenHandler }) {
         let knownUser = null;
         return findUserByEMail(email)
            .then(user => {
               knownUser = user;
               return tokenHandler.encrypt(user);
            }).then(token => {
               return updateResetPwdTokenInUser(token, knownUser.id);
            }).then(user => {
               return sendEMail(forgotPasswordTemplate, user);
            });
      },
      resetPassword(_, { password, confirmation, resetPwdToken }, { tokenHandler }) {
         return tokenHandler.validate(resetPwdToken)
            .then(token => {
               return findUserById(token.userId);
            })
            .then(knownUser => {
               return updatePasswordAndTokenInUser(password, confirmation, resetPwdToken, knownUser);
            });
      }
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