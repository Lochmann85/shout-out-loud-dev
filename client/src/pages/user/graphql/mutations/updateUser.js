import { graphql, gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

const _updateViewer = (clientStore, updatedUser, viewerId) => {
   if (updatedUser.id === viewerId) {
      let fragment;
      try {
         fragment = graphQLStore.findFragment("RootViewer");
      } catch (error) { }

      if (fragment) {
         const fragmentConfig = fragment.buildExecutable(viewerId);

         const viewer = clientStore.readFragment(fragmentConfig);

         viewer.name = updatedUser.name;

         clientStore.writeFragment({
            ...fragmentConfig,
            data: { ...viewer },
         });
      }
   }
};

let updateUserMutation;

const usersFragment = graphQLStore.findFragment("UserRouteUser");
if (usersFragment) {
   const updateUserMutationDefinition = gql`
   mutation updateUser($userData: UserData, $userId: ID!) {
      updateUser(userData: $userData, userId: $userId) {
         ...${usersFragment.name}
      }  
   }
   ${usersFragment.document}`;

   updateUserMutation = graphql(updateUserMutationDefinition, {
      props: ({ mutate }) => ({
         updateUser: (userData, userId, viewerId) => {
            return mutate({
               variables: { userData, userId },
               update: (clientStore, { data: { updateUser } }) => {
                  _updateViewer(clientStore, updateUser, viewerId);
               },
            });
         },
      }),
   });
}
else {
   throw new Error("FATAL ERROR: Could not find user fragment for updateUserMutation.");
}

export default updateUserMutation;