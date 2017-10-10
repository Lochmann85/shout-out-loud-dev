import { gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

let query;

const rolesFragment = graphQLStore.findFragment("RoleRouteRole");
if (rolesFragment) {
   query = {
      document: gql`
      query getAllRolesQuery {
         getAllRoles {
            ...${rolesFragment.name}
         }
      }
      ${rolesFragment.document}`,
      config: {
         name: "getAllRolesQuery"
      }
   };

   graphQLStore.addQuery(query);
}
else {
   throw new Error("FATAL ERROR, could not generate getAllRolesQuery");
}

export default query;