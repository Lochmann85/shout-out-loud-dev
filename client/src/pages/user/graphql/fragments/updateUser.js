import gql from 'graphql-tag';

import graphQLStore from './../../../../storeHandler/graphQLStore';

import userFormFragments from './userForm';

const fragments = {
   users: {
      name: "UpdateUser",
      document: gql`
      fragment UpdateUser on User {
         id
         name
         ...${userFormFragments.user.name}
      }
      ${userFormFragments.user.document}`
   },
   roles: {
      name: "UpdateUserRoles",
      document: gql`
      fragment UpdateUserRoles on Role {
         ...${userFormFragments.roles.name}
      }
      ${userFormFragments.roles.document}`
   },
   viewer: {
      name: "UpdateUserViewer",
      document: gql`
      fragment UpdateUserViewer on IAuthorized {
         id
         name
         role {
            rules {
               ruleset {
                  read
                  write
               }
            }
         }
      }`
   }
};

graphQLStore.addFragment(fragments.users);

export default fragments;