import gql from 'graphql-tag';

import shoutPreviewFragments from './shoutPreview';
import pushShoutFormFragments from './pushShoutForm';

export default {
   shouts: {
      name: "ShoutActionContainerShouts",
      document: gql`
      fragment ShoutActionContainerShouts on Shout {
         ...${shoutPreviewFragments.shouts.name}
      }
      ${shoutPreviewFragments.shouts.document}`
   },
   viewer: {
      name: "ShoutActionContainerViewer",
      document: gql`
      fragment ShoutActionContainerViewer on IAuthorized {
         ...${shoutPreviewFragments.viewer.name}
         ...${pushShoutFormFragments.viewer.name}
      }
      ${shoutPreviewFragments.viewer.document}
      ${pushShoutFormFragments.viewer.document}`
   }
};