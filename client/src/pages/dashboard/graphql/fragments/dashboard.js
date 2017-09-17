import gql from 'graphql-tag';

import shoutScreenFragments from './shoutScreen';
import shoutActionContainerFragments from './shoutActionContainer';

import graphQLStore from './../../../../storeHandler/graphQLStore';

const fragment = {
   shouts: {
      name: "DashboardShouts",
      document: gql`
      fragment DashboardShouts on Shout {
         ...${shoutScreenFragments.shouts.name}
         ...${shoutActionContainerFragments.shouts.name}
      }
      ${shoutScreenFragments.shouts.document}
      ${shoutActionContainerFragments.shouts.document}`
   },
   viewer: {
      name: "DashboardViewer",
      document: gql`
      fragment DashboardViewer on IAuthorized {
         ...${shoutActionContainerFragments.viewer.name}
      }
      ${shoutActionContainerFragments.viewer.document}`
   }
};

graphQLStore.addFragment(fragment.shouts);

export default fragment;