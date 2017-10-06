import { addResolveFunctionsToSchema } from 'graphql-tools';

import { authenticateUser } from './../../mongoDbApi/services/user/authenticationDbService';
import { createNewToken } from './../../jwtApi/jwtService';

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
   name: String
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
               name: knownUser.name,
               token
            };
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