import gql from 'graphql-tag';

import graphQLStore from './../storeHandler/graphQLStore';

import privateRoutesFragments from './privateRoutesFragments';
import dashboardFragments from './dashboard/graphql/fragments/dashboard';

export default {
   viewer: {
      name: "RoutesViewer",
      document: gql`
      fragment RoutesViewer on IAuthorized {
         ...${privateRoutesFragments.viewer.name}
         ...${dashboardFragments.viewer.name}
      }
      ${privateRoutesFragments.viewer.document}
      ${dashboardFragments.viewer.document}`
   }
};