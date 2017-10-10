import { graphql, gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

/**
 * @private
 * @function _deleteRoleFromAllRoles
 * @description updates the roles query and deletes the role
 * @param {object} clientStore - apollo store
 * @param {id} deletedRoleId - deleted role id
 * @param {object} rolesQuery - graphql string query definition
 */
const _deleteRoleFromAllRoles = (clientStore, deletedRoleId, rolesQuery) => {
   let getAllRolesQuery;
   try {
      getAllRolesQuery = clientStore.readQuery({ query: rolesQuery.document });
   } catch (error) { }

   if (getAllRolesQuery) {
      const roleIndex = getAllRolesQuery.getAllRoles.findIndex(role => role.id === deletedRoleId);
      if (roleIndex > -1) {
         getAllRolesQuery.getAllRoles.splice(roleIndex, 1);

         clientStore.writeQuery({
            query: rolesQuery.document, data: getAllRolesQuery
         });
      }
   }
};

/**
 * @private
 * @function _changeDeletedRoleInUsers
 * @description updates the users query and changes the deleted role with the default role
 * @param {object} clientStore - apollo store
 * @param {id} deletedRoleId - deleted role id
 * @param {object} defaultRole - default role
 * @param {object} usersQuery - graphql string query definition
 */
const _changeDeletedRoleInUsers = (clientStore, deletedRoleId, defaultRole, usersQuery) => {
   let getAllUsersQuery;
   try {
      getAllUsersQuery = clientStore.readQuery({ query: usersQuery.document });
   } catch (error) { }

   if (getAllUsersQuery) {
      let usersHaveChanged = false;
      getAllUsersQuery.getAllUsers.forEach(user => {
         if (user.role.id === deletedRoleId) {
            user.role = defaultRole;
            usersHaveChanged = true;
         }
      });

      if (usersHaveChanged) {
         clientStore.writeQuery({
            query: usersQuery.document, data: getAllUsersQuery
         });
      }
   }
};

const _updateStore = (clientStore, deletedRoleId, defaultRole) => {
   const rolesQuery = graphQLStore.findQuery("getAllRolesQuery"),
      usersQuery = graphQLStore.findQuery("getAllUsersQuery");
   if (rolesQuery) {
      _deleteRoleFromAllRoles(clientStore, deletedRoleId, rolesQuery);
   }
   if (usersQuery) {
      _changeDeletedRoleInUsers(clientStore, deletedRoleId, defaultRole, usersQuery);
   }
};

let deleteRoleMutation;

const rolesFragment = graphQLStore.findFragment("RoleRouteRole");
if (rolesFragment) {
   const deleteRoleMutationDefinition = gql`
   mutation deleteRole($roleId: ID!) {
      deleteRole(roleId: $roleId) {
         ...${rolesFragment.name}
      }
   }
   ${rolesFragment.document}`;

   deleteRoleMutation = graphql(deleteRoleMutationDefinition, {
      props: ({ mutate }) => ({
         deleteRole: (deletedRoleId) => {
            return mutate({
               variables: { roleId: deletedRoleId },
               update: (clientStore, { data: { deleteRole } }) => {
                  _updateStore(clientStore, deletedRoleId, deleteRole);
               },
            });
         },
      }),
   });
}
else {
   throw new Error("FATAL ERROR: Could not find role fragment for deleteRoleMutation.");
}

export default deleteRoleMutation;