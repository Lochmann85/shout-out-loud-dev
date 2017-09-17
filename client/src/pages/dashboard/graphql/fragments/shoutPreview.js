import gql from 'graphql-tag';

export default {
   shouts: {
      name: "ShoutPreviewShouts",
      document: gql`
      fragment ShoutPreviewShouts on Shout {
         message
         type
      }
      `
   },
   viewer: {
      name: "ShoutPreviewViewer",
      document: gql`
      fragment ShoutPreviewViewer on IAuthorized {
         id
      }`
   }
};