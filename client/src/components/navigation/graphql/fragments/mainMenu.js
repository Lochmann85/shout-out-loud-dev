import gql from 'graphql-tag';

import controlCenterFragment from './controlCenter';

export default {
   viewer: {
      name: "MainMenuViewer",
      document: gql`
      fragment MainMenuViewer on IAuthorized {
         ...${controlCenterFragment.viewer.name}
      }
      ${controlCenterFragment.viewer.document}`
   }
};