import { graphql, gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

const _updateStore = (clientStore, newRole) => {
   const query = graphQLStore.findQuery("getAllRolesQuery");
   if (query) {
      let getAllRolesQuery;
      try {
         getAllRolesQuery = clientStore.readQuery({ query: query.document });
      } catch (error) { }

      if (getAllRolesQuery) {
         getAllRolesQuery.getAllRoles.push(newRole);

         clientStore.writeQuery({
            query: query.document, data: getAllRolesQuery
         });
      }
   }
};

let createRoleMutation;

const rolesFragment = graphQLStore.findFragment("RoleRouteRole");
if (rolesFragment) {
   const createRoleMutationDefinition = gql`
   mutation createRole($roleData: RoleData!) {
      createRole(roleData: $roleData) {
         ...${rolesFragment.name}
      }
   }
   ${rolesFragment.document}`;

   createRoleMutation = graphql(createRoleMutationDefinition, {
      props: ({ mutate }) => ({
         createRole: (roleData) => {
            return mutate({
               variables: { roleData },
               update: (clientStore, { data: { createRole } }) => {
                  _updateStore(clientStore, createRole);
               },
            });
         },
      }),
   });
}
else {
   throw new Error("FATAL ERROR: Could not find role fragment for createRoleMutation.");
}

export default createRoleMutation;