import gql from 'graphql-tag';

import controlCenterFragment from './graphql/fragments/controlCenter';

export default {
   viewer: {
      name: "ControlCenterViewer",
      document: gql`
      fragment ControlCenterViewer on IAuthorized {
         ...${controlCenterFragment.viewer.name}
      }
      ${controlCenterFragment.viewer.document}`
   }
};