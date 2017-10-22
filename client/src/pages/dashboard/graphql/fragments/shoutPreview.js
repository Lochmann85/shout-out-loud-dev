import gql from 'graphql-tag';

export default {
   shouts: {
      name: "ShoutPreviewShouts",
      document: gql`
      fragment ShoutPreviewShouts on Shout {
         id
         message
         type
         user {
            ...ShoutUser
         }
         createdAt
      }
      fragment ShoutUser on User {
         id
         name
      }`
   },
   viewer: {
      name: "ShoutPreviewViewer",
      document: gql`
      fragment ShoutPreviewViewer on IAuthorized {
         id
      }`
   }
};