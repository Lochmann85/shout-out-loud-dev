import gql from 'graphql-tag';

import graphQLStore from './../../../../storeHandler/graphQLStore';

import roleFormFragments from './roleForm';

const fragments = {
   roles: {
      name: "UpdateRole",
      document: gql`
      fragment UpdateRole on Role {
         id
         name
         isStatic
         ...${roleFormFragments.role.name}
      }
      ${roleFormFragments.role.document}`
   },
   viewer: {
      name: "UpdateRoleViewer",
      document: gql`
      fragment UpdateRoleViewer on IAuthorized {
         id
         name
         role {
            rules {
               id
               name
            }
         }
      }`
   }
};
graphQLStore.addFragment(fragments.roles);

export default fragments;