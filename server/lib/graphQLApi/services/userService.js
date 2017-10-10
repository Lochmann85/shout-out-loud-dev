import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   findAllUsers,
   findUserById,
   createUser,
   updateUser,
   changeUserPassword,
   deleteUser
} from './../../mongoDbApi/services/user/userDbService';

const types = `
interface IUser {
   id: ID!
   name: String!
   role: Role!
}
type User implements IUser {
   id: ID!
   email: String!
   name: String!
   role: Role!
   createdAt: String!
}
input UserData {
   email: String
   name: String
   role: ID
   password: String
}
input PasswordChangeData {
   password: String
   new: String
   confirm: String
}
`;

const queries = `
getAllUsers: [User!]
getUser(userId: ID!): User!
`;

const _queriesResolver = {
   Query: {
      getAllUsers: () => {
         return findAllUsers();
      },
      getUser: (_, { userId }) => {
         return findUserById(userId);
      }
   }
};

const mutations = `
createUser(userData: UserData): User!
updateUser(userData: UserData, userId: ID!): User!
changeUserPassword(passwordChangeData: PasswordChangeData, userId: ID!): Boolean!
deleteUser(userId: ID!): User!
`;

const _mutationsResolver = {
   Mutation: {
      createUser: (_, { userData }) => {
         return createUser(userData);
      },
      updateUser: (_, { userData, userId }, { viewer }) => {
         return updateUser(userData, userId);
      },
      changeUserPassword: (_, { passwordChangeData, userId }, context) => {
         return changeUserPassword(passwordChangeData, userId);
      },
      deleteUser: (_, { userId }) => {
         return deleteUser(userId);
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