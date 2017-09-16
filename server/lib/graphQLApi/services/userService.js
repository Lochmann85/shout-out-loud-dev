import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   findAllUsers,
   findUserById,
   createUser,
   updateUser,
   changeUserPassword,
   deleteUser
} from './../../mongoDbApi/services/user/userDbService';

// import {
//    and,
//    or
// } from './../../helper/compositions';
// import {
//    userAdministration,
//    roleAdministration,
//    self,
//    notSelf
// } from './../../authorizationApi/authorizationService';
// import NotSelf from './../../authorizationApi/check/NotSelf';

const types = `
interface IUser {
   id: ID!
   name: String!
   role: Role!
}
type User implements IUser {
   id: ID!
   name: String!
   role: Role!
   createdAt: String!
}
input UserData {
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
      getAllUsers: /*userAdministration("r")*/(() => {
         return findAllUsers();
      }),
      getUser: /*or(userAdministration("r"), self())*/((_, { userId }) => {
         return findUserById(userId);
      })
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
      createUser: /*and(userAdministration("rw"), roleAdministration("r"))*/((_, { userData }) => {
         return createUser(userData);
      }),
      updateUser: /*or(userAdministration("rw"), self())*/((_, { userData, userId }, { viewer }) => {
         // const notSelf = new NotSelf();
         // if (userData.role) {
         //    return notSelf.isAllowed({ userId }, viewer).then(() => {
         //       return updateUser(userData, userId);
         //    });
         // }
         // else {
         return updateUser(userData, userId);
         // }
      }),
      changeUserPassword: /*or(userAdministration("rw"), self())*/((_, { passwordChangeData, userId }, context) => {
         return changeUserPassword(passwordChangeData, userId);
      }),
      deleteUser: /*and(userAdministration("d"), notSelf())*/((_, { userId }) => {
         return deleteUser(userId);
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
   addResolveFunctionsToSchema(executableSchema, _mutationsResolver);
};

export {
   types,
   queries,
   mutations,
   addResolversTo,
};