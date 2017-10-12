import gql from 'graphql-tag';

export default {
   viewer: {
      name: "PushShoutFormViewer",
      document: gql`
      fragment PushShoutFormViewer on IAuthorized {
         id
         role {
            id
            rules {
               id
               name
            }
         }
      }`
   }
};