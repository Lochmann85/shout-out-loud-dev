import gql from 'graphql-tag';

import userTableFragments from './userTable';
import updateUserFragments from './updateUser';
import graphQLStore from './../../../../storeHandler/graphQLStore';

const fragments = {
   viewer: {
      name: "UserRoutesViewer",
      document: gql`
      fragment UserRoutesViewer on IAuthorized {
         ...${userTableFragments.viewer.name}
         ...${updateUserFragments.viewer.name}
         role {
            id
         }
      }
      ${userTableFragments.viewer.document}
      ${updateUserFragments.viewer.document}`
   },
   user: {
      name: "UserRouteUser",
      typeName: "User",
      document: gql`
      fragment UserRouteUser on User {
         ...${userTableFragments.users.name}
         ...${updateUserFragments.users.name}
      }
      ${userTableFragments.users.document}
      ${updateUserFragments.users.document}`
   }
};
graphQLStore.addFragment(fragments.user);

export default fragments;