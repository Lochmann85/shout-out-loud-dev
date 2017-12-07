import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   authenticateUser,
   findUserByEMail,
   updateResetPwdTokenInUser,
} from './../../mongoDbApi/services/user/authenticationDbService';
import {
   createNewResetPasswordToken
} from './../../jwtApi/jwtService';

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
sendResetPassword(email: String): Boolean!
resetPassword(password: String, token: String): Boolean!
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
      sendResetPassword(_, { email }) {
         return findUserByEMail(email).then(knownUser => {
            return createNewResetPasswordToken(knownUser).then(token => {
               return updateResetPwdTokenInUser(token, knownUser.id).then(user => {
                  return true;
               });
            });
         });
      },
      resetPassword(_, { password, token }) {
         return true;
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