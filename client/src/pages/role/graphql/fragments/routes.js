import gql from 'graphql-tag';

import roleTableFragments from './roleTable';
import updateRoleFragments from './updateRole';
import graphQLStore from './../../../../storeHandler/graphQLStore';

const fragments = {
   viewer: {
      name: "RoleRoutesViewer",
      document: gql`
      fragment RoleRoutesViewer on IAuthorized {
         ...${roleTableFragments.viewer.name}
         ...${updateRoleFragments.viewer.name}
      }
      ${roleTableFragments.viewer.document}
      ${updateRoleFragments.viewer.document}`
   },
   role: {
      name: "RoleRouteRole",
      typeName: "Role",
      document: gql`
      fragment RoleRouteRole on Role {
         ...${roleTableFragments.roles.name}
         ...${updateRoleFragments.roles.name}
      }
      ${roleTableFragments.roles.document}
      ${updateRoleFragments.roles.document}`
   }
};
graphQLStore.addFragment(fragments.role);

export default fragments;