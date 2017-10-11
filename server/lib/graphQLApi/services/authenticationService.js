import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   authenticateUser,
   findUserByEMail,
   updateResetPwdTokenInUser,
} from './../../mongoDbApi/services/user/authenticationDbService';
import {
   createNewToken,
   createNewResetPasswordToken
} from './../../jwtApi/jwtService';

const types = `
type MenuItem {
   label: String!
   path: String!
}
type MenuGroup {
   label: String!
   menuItems: [MenuItem!]!
   subMenus: [MenuGroup!]
}
interface IAuthorized {
   id: ID!
   name: String!
   role: Role!
   navigation: [MenuGroup!]
}
type Viewer implements IUser, IAuthorized {
   id: ID!
   name: String!
   token: String!
   role: Role!
   navigation: [MenuGroup!]
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
      getViewer(_, args, context) {
         let knownViewer = context.viewer;

         return createNewToken(knownViewer).then(token => {
            return {
               id: knownViewer.id,
               name: knownViewer.name,
               role: knownViewer.role,
               token,
            };
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
      login(_, { credentials }) {
         let knownUser = null;
         return authenticateUser(credentials).then(user => {
            knownUser = user;
            return createNewToken(knownUser);
         }).then(token => {
            return {
               id: knownUser.id,
               token
            };
         }).catch(error => {
            return Promise.reject(error);
         });
      },
      sendResetPassword(_, { email }) {
         return findUserByEMail(email).then(knownUser => {
            return createNewResetPasswordToken(knownUser).then(token => {
               return updateResetPwdTokenInUser(token, knownUser.id).then(user => {
                  return true;
               });
            });
         }).catch(error => {
            return Promise.reject(error);
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