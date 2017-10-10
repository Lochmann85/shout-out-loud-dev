import gql from 'graphql-tag';

export default {
   user: {
      name: "UserTableRow",
      document: gql`
      fragment UserTableRow on User {
         id
         email
         createdAt
         role {
            id
            name
         }
      }`
   },
   viewer: {
      name: "UserTableRowViewer",
      document: gql`
      fragment UserTableRowViewer on IAuthorized {
         id
         role {
            id
         }
      }`
   }
};