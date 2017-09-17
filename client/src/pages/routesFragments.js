import gql from 'graphql-tag';

import graphQLStore from './../storeHandler/graphQLStore';

import privateRoutesFragments from './privateRoutesFragments';
import dashboardFragments from './dashboard/graphql/fragments/dashboard';

const fragments = {
   viewer: {
      name: "RoutesViewer",
      typeName: "IAuthorized",
      document: gql`
      fragment RoutesViewer on IAuthorized {
         ...${privateRoutesFragments.viewer.name}
         ...${dashboardFragments.viewer.name}
      }
      ${privateRoutesFragments.viewer.document}
      ${dashboardFragments.viewer.document}`
   }
};
graphQLStore.addFragment(fragments.viewer);

export default fragments;