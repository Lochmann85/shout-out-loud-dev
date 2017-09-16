import { addResolveFunctionsToSchema } from 'graphql-tools';

import {
   findAllRoles,
   findRoleById,
   createRole,
   updateRole,
   deleteRole
} from './../../mongoDbApi/services/role/roleDbService';
// import { and } from './../../helper/compositions';
// import { roleAdministration, notOwnRole } from './../../authorizationApi/authorizationService';

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
   rules: [RuleData]
}`;

const queries = `
   getAllRoles: [Role!]
   getRole(roleId: ID!): Role!
`;

const mutations = `
   createRole(roleData: RoleData!): Role!
   updateRole(roleData: RoleData!, roleId: ID!): Role!
   deleteRole(roleId: ID!): Role!
`;

const _queriesResolver = {
   Query: {
      getAllRoles: /*roleAdministration("r")*/(() => {
         return findAllRoles();
      }),
      getRole: /*roleAdministration("r")*/((_, { roleId }) => {
         return findRoleById(roleId);
      }),
   }
};

const _mutationsResolver = {
   Mutation: {
      createRole: /*roleAdministration("rw")*/((_, { roleData }) => {
         return createRole(roleData);
      }),
      updateRole: /*and(roleAdministration("rw"), notOwnRole())*/((_, { roleData, roleId }, { viewer }) => {
         return updateRole(roleData, roleId);
      }),
      deleteRole: /*and(roleAdministration("rd"), notOwnRole())*/((_, { roleId }) => {
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