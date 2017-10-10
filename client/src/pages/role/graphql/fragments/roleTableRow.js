import gql from 'graphql-tag';

export default {
   role: {
      name: "RoleTableRow",
      document: gql`
      fragment RoleTableRow on Role {
         id
         name
         isStatic
         createdAt
      }`
   },
   viewer: {
      name: "RoleTableRowViewer",
      document: gql`
      fragment RoleTableRowViewer on IAuthorized {
         id
      }`
   }
};