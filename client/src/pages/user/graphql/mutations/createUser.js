import { graphql, gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

const _updateStore = (clientStore, newUser) => {
   const query = graphQLStore.findQuery("getAllUsersQuery");
   if (query) {
      let getAllUsersQuery;
      try {
         getAllUsersQuery = clientStore.readQuery({ query: query.document });
      }
      catch (error) { }

      if (getAllUsersQuery) {
         getAllUsersQuery.getAllUsers.push(newUser);

         clientStore.writeQuery({
            query: query.document, data: getAllUsersQuery
         });
      }
   }
};

let createUserMutation;

const usersFragment = graphQLStore.findFragment("UserRouteUser");
if (usersFragment) {
   const createUserMutationDefinition = gql`
   mutation createUser($userData: UserData) {
      createUser(userData: $userData) {
         ...${usersFragment.name}
      }
   }
   ${usersFragment.document}`;

   createUserMutation = graphql(createUserMutationDefinition, {
      props: ({ mutate }) => ({
         createUser: (userData) => {
            return mutate({
               variables: { userData },
               update: (clientStore, { data: { createUser } }) => {
                  _updateStore(clientStore, createUser);
               },
            });
         },
      }),
   });
}
else {
   throw new Error("FATAL ERROR: Could not find user fragment for createUserMutation.");
}

export default createUserMutation;