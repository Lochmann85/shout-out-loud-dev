import gql from 'graphql-tag';

export default {
   viewer: {
      name: "PrivateViewer",
      typeName: "IAuthorized",
      document: gql`
      fragment PrivateViewer on IAuthorized {
         id
      }`
   }
};