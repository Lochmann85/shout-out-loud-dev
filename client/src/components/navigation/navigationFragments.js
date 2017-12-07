import gql from 'graphql-tag';

import mainMenuFragment from './graphql/fragments/mainMenu';

export default {
   viewer: {
      name: "NavigationViewer",
      document: gql`
      fragment NavigationViewer on IAuthorized {
         ...${mainMenuFragment.viewer.name}
      }
      ${mainMenuFragment.viewer.document}`
   }
};