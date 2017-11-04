import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   findAllRoles,
   findRoleById,
   createRole,
   updateRole,
   deleteRole
} from './../../mongoDbApi/services/role/roleDbService';
import {
   authorizationMiddleware,
   ReadRoleChecker,
   WriteRoleChecker,
   DeleteRoleChecker,
   NotOwnRoleChecker,
} from './../../authorizationApi/authorizationService';

const readRole = new ReadRoleChecker();
const createRoleRead = new ReadRoleChecker();
const updateRoleRead = new ReadRoleChecker();
const deleteRoleRead = new ReadRoleChecker();

const types = `
type Role {
   id: ID!
   name: String!
   createdAt: String!
   isStatic: Boolean!
   rules: [Rule!]
}
input RoleData {
   name: String
   rules: [ID!]
}`;

const queries = `
   getAllRoles: [Role!]
   getRole(roleId: ID!): Role!
`;

const mutations = `
   createRole(roleData: RoleData): Role!
   updateRole(roleData: RoleData, roleId: ID!): Role!
   deleteRole(roleId: ID!): Role!
`;

const _queriesResolver = {
   Query: {
      getAllRoles: authorizationMiddleware(readRole)(() => {
         return findAllRoles();
      }),
      getRole: authorizationMiddleware(readRole)((_, { roleId }) => {
         return findRoleById(roleId);
      }),
   }
};

const _mutationsResolver = {
   Mutation: {
      createRole: authorizationMiddleware(createRoleRead.and(WriteRoleChecker))((_, { roleData }) => {
         return createRole(roleData);
      }),
      updateRole: authorizationMiddleware(
         updateRoleRead.and(WriteRoleChecker).and(NotOwnRoleChecker)
      )((_, { roleData, roleId }, { viewer }) => {
         return updateRole(roleData, roleId);
      }),
      deleteRole: authorizationMiddleware(
         deleteRoleRead.and(DeleteRoleChecker).and(NotOwnRoleChecker)
      )((_, { roleId }) => {
         return deleteRole(roleId);
      }),
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