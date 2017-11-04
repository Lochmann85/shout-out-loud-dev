import { addResolveFunctionsToSchema } from 'graphql-tools';

import { CustomError } from './../../errorsApi';

import {
   findAllUsers,
   findUserById,
   createUser,
   updateUser,
   changeUserPassword,
   deleteUser
} from './../../mongoDbApi/services/user/userDbService';
import {
   authorizationMiddleware,
   ReadRoleChecker,
   ReadUserChecker,
   WriteUserChecker,
   DeleteUserChecker,
   SelfChecker,
   NotSelfChecker,
} from './../../authorizationApi/authorizationService';

const readUser = new ReadUserChecker();
const createUserRead = new ReadUserChecker();
const updateUserRead = new ReadUserChecker();
const updatePasswordRead = new ReadUserChecker();
const deleteUserRead = new ReadUserChecker();

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
      getAllUsers: authorizationMiddleware(readUser)(() => {
         return findAllUsers();
      }),
      getUser: authorizationMiddleware(
         readUser.or(SelfChecker)
      )((_, { userId }) => {
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
      createUser: authorizationMiddleware(
         createUserRead.and(WriteUserChecker).and(ReadRoleChecker)
      )((_, { userData }) => {
         return createUser(userData);
      }),
      updateUser: authorizationMiddleware(
         updateUserRead.and(WriteUserChecker).and(ReadRoleChecker).or(SelfChecker)
      )((_, { userData, userId }, { viewer }) => {
         const notSelf = new NotSelfChecker();
         if (userData.role) {
            return notSelf.check({ userId }, viewer).then(() => {
               return updateUser(userData, userId);
            }).catch(error => {
               if (error.name === "Forbidden") {
                  return new CustomError("ChangeRoleNotAllowed", {
                     message: "You cannot change the role.",
                     key: "role"
                  });
               }
               else {
                  return error;
               }
            });
         }
         else {
            return updateUser(userData, userId);
         }
      }),
      changeUserPassword: authorizationMiddleware(
         updatePasswordRead.and(WriteUserChecker).or(SelfChecker)
      )((_, { passwordChangeData, userId }, context) => {
         return changeUserPassword(passwordChangeData, userId);
      }),
      deleteUser: authorizationMiddleware(
         deleteUserRead.and(DeleteUserChecker).and(NotSelfChecker)
      )((_, { userId }) => {
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