import { gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

let query;

const roleFragment = graphQLStore.findFragment("UpdateRole");
if (roleFragment) {
   query = {
      document: gql`
      query getRoleQuery($roleId: ID!) {
         getRole(roleId: $roleId) {
            ...${roleFragment.name}
         }
      }
      ${roleFragment.document}`,
      config: {
         name: "getRoleQuery",
         options: (ownProps) => {
            return {
               variables: { roleId: ownProps.match.params.roleId }
            };
         }
      }
   };
}
else {
   throw new Error("FATAL ERROR, could not generate getRoleQuery");
}

export default query;