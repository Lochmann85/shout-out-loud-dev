import gql from 'graphql-tag';

import viewerInfoFragment from './viewerInfo';

export default {
   viewer: {
      name: "ControlCenterViewer",
      document: gql`
      fragment ControlCenterViewer on IAuthorized {
         ...${viewerInfoFragment.viewer.name}
         role {
            id
            rules {
               id
               name
            }
         }
      }
      ${viewerInfoFragment.viewer.document}`
   }
};