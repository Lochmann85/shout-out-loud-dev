import { graphql, gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

let updateRoleMutation;

const rolesFragment = graphQLStore.findFragment("RoleRouteRole");
if (rolesFragment) {
   const updateRoleMutationDefinition = gql`
   mutation updateRole($roleData: RoleData!, $roleId: ID!) {
      updateRole(roleData: $roleData, roleId: $roleId) {
         ...${rolesFragment.name}
      }
   }
   ${rolesFragment.document}`;

   updateRoleMutation = graphql(updateRoleMutationDefinition, {
      props: ({ mutate }) => ({
         updateRole: (roleData, roleId) => {
            return mutate({
               variables: { roleData, roleId },
            });
         },
      }),
   });
}
else {
   throw new Error("FATAL ERROR: Could not find role fragment for updateRoleMutation.");
}

export default updateRoleMutation;