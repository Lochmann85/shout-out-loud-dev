import gql from 'graphql-tag';

import roleTableRowFragments from './roleTableRow';

export default {
   roles: {
      name: "RoleTable",
      document: gql`
      fragment RoleTable on Role {
         id
         name
         ...${roleTableRowFragments.role.name}
      }
      ${roleTableRowFragments.role.document}`
   },
   viewer: {
      name: "RoleTableViewer",
      document: gql`
      fragment RoleTableViewer on IAuthorized {
         id
         ...${roleTableRowFragments.viewer.name}
      }
      ${roleTableRowFragments.viewer.document}`
   }
};