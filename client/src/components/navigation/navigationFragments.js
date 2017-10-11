import gql from 'graphql-tag';

import controlCenterFragment from './graphql/fragments/controlCenter';

export default {
   viewer: {
      name: "NavigationViewer",
      document: gql`
      fragment NavigationViewer on IAuthorized {
         ...${controlCenterFragment.viewer.name}
      }
      ${controlCenterFragment.viewer.document}`
   }
};