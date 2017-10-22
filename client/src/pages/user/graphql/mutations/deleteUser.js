import { graphql, gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

/**
 * @private
 * @function _deleteUserFromAllUsers
 * @description updates the users query and deletes the user
 * @param {object} clientStore - apollo store
 * @param {id} deletedUserId - deleted user id
 * @param {object} usersQuery - graphql string query definition
 */
const _deleteUserFromAllUsers = (clientStore, deletedUserId, usersQuery) => {
   if (usersQuery) {
      let getAllUsersQuery;
      try {
         getAllUsersQuery = clientStore.readQuery({ query: usersQuery.document });
      } catch (error) { }

      if (getAllUsersQuery) {
         const userIndex = getAllUsersQuery.getAllUsers.findIndex(user => user.id === deletedUserId);
         if (userIndex > -1) {
            getAllUsersQuery.getAllUsers.splice(userIndex, 1);

            clientStore.writeQuery({
               query: usersQuery.document, data: getAllUsersQuery
            });
         }
      }
   }
};

/**
 * @private
 * @function _deleteUserShoutsInShouts
 * @description updates the shouts query and deletes all shouts from user
 * @param {object} clientStore - apollo store
 * @param {id} deletedUserId - deleted user id
 * @param {object} shoutsQuery - graphql string query definition
 */
const _deleteUserShoutsInShouts = (clientStore, deletedUserId, shoutsQuery) => {
   let shoutsQueueQuery;
   try {
      shoutsQueueQuery = clientStore.readQuery({ query: shoutsQuery.document });
   } catch (error) { }

   if (shoutsQueueQuery) {
      const filteredShouts = shoutsQueueQuery.getShoutsQueue.filter(
         shout => shout.user.id !== deletedUserId
      );

      clientStore.writeQuery({
         query: shoutsQuery.document, data: { getShoutsQueue: filteredShouts }
      });
   }
};

const _updateStore = (clientStore, deletedUser) => {
   const usersQuery = graphQLStore.findQuery("getAllUsersQuery"),
      shoutsQuery = graphQLStore.findQuery("shoutsQueueQuery");
   if (usersQuery) {
      _deleteUserFromAllUsers(clientStore, deletedUser.id, usersQuery);
   }
   if (shoutsQuery) {
      _deleteUserShoutsInShouts(clientStore, deletedUser.id, shoutsQuery);
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