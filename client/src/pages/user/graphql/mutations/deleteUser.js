import { graphql, gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

const _updateStore = (clientStore, deletedUser) => {
   const query = graphQLStore.findQuery("getAllUsersQuery");
   if (query) {
      let getAllUsersQuery;
      try {
         getAllUsersQuery = clientStore.readQuery({ query: query.document });
      } catch (error) { }

      if (getAllUsersQuery) {
         const userIndex = getAllUsersQuery.getAllUsers.findIndex(user => user.id === deletedUser.id);
         if (userIndex > -1) {
            getAllUsersQuery.getAllUsers.splice(userIndex, 1);

            clientStore.writeQuery({
               query: query.document, data: getAllUsersQuery
            });
         }
      }
   }
};

let deleteUserMutation;

const usersFragment = graphQLStore.findFragment("UserRouteUser");
if (usersFragment) {
   const deleteUserMutationDefinition = gql`
   mutation deleteUser($userId: ID!) {
      deleteUser(userId: $userId) {
         ...${usersFragment.name}
      }  
   }
   ${usersFragment.document}`;

   deleteUserMutation = graphql(deleteUserMutationDefinition, {
      props: ({ mutate }) => ({
         deleteUser: (userId) => {
            return mutate({
               variables: { userId },
               update: (clientStore, { data: { deleteUser } }) => {
                  _updateStore(clientStore, deleteUser);
               },
            });
         },
      }),
   });
}
else {
   throw new Error("FATAL ERROR: Could not find user fragment for deleteUserMutation.");
}

export default deleteUserMutation;