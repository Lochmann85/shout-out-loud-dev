import gql from 'graphql-tag';

import userTableRowFragments from './userTableRow';

export default {
   users: {
      name: "UserTable",
      document: gql`
      fragment UserTable on User {
         id
         name
         ...${userTableRowFragments.user.name}
      }
      ${userTableRowFragments.user.document}`
   },
   viewer: {
      name: "UserTableViewer",
      document: gql`
      fragment UserTableViewer on IAuthorized {
         id
         ...${userTableRowFragments.viewer.name}
      }
      ${userTableRowFragments.viewer.document}`
   }
};