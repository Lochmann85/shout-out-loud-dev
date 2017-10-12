import gql from 'graphql-tag';

import userRoutesFragments from './user/graphql/fragments/routes';
import roleRoutesFragments from './role/graphql/fragments/routes';

export default {
   viewer: {
      name: "PrivateViewer",
      typeName: "IAuthorized",
      document: gql`
      fragment PrivateViewer on IAuthorized {
         ...${userRoutesFragments.viewer.name}
         ...${roleRoutesFragments.viewer.name}
      }
      ${userRoutesFragments.viewer.document}
      ${roleRoutesFragments.viewer.document}`
   }
};