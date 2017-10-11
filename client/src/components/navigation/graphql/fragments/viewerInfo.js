import gql from 'graphql-tag';

export default {
   viewer: {
      name: "ViewerInfoViewer",
      document: gql`
      fragment ViewerInfoViewer on IAuthorized {
         id
         name
         role {
            id
            name
         }
      }`
   }
};