import { gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

let query;

const usersFragment = graphQLStore.findFragment("UserRouteUser");
if (usersFragment) {
   query = {
      document: gql`
      query getAllUsersQuery {
         getAllUsers {
            ...${usersFragment.name}
         }
      }
      ${usersFragment.document}`,
      config: {
         name: "getAllUsersQuery"
      }
   };

   graphQLStore.addQuery(query);
}
else {
   throw new Error("FATAL ERROR, could not generate getAllUsersQuery");
}

export default query;