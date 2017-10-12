import React from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import ShoutActionContainer from './components/ShoutActionContainer';
import ShoutScreen from './components/ShoutScreen';
import { HiddenWrapper, WrapperWithOffset } from './../../assets/styled/Wrapper';
import BaseLayoutLoader from './../../components/layout/BaseLayoutLoader';
import dashboardFragments from './graphql/fragments/dashboard';
import shoutsQueueQuery from './graphql/queries/shoutsQueueQuery';
import queryErrorHandling from './../../components/errorHandling/queryErrorHandling';
import { checkForUnauthorizedInErrors } from './../../components/errorHandling/checkForErrorTypes';
import apolloClient from './../../storeHandler/apolloClient';

class Dashboard extends React.Component {

   componentWillReceiveProps(nextProp) {
      if (nextProp.location.state && nextProp.location.state.resetStore) {
         nextProp.location.state.resetStore = false;

         apolloClient.resetStore().catch(checkForUnauthorizedInErrors);
      }
   }

   render() {
      const { shoutsQueueQuery } = this.props;

      if (shoutsQueueQuery.loading) {
         return <BaseLayoutLoader />;
      }
      else if (shoutsQueueQuery.error) {
         console.log(shoutsQueueQuery.error);
         return <BaseLayoutLoader />;
      }

      return (
         <WrapperWithOffset>
            <HiddenWrapper>
               <h1>Shout out your thought!</h1>
            </HiddenWrapper>
            <ShoutScreen />
            <ShoutActionContainer shoutsQueueQuery={shoutsQueueQuery} />
         </WrapperWithOffset >
      );
   }
};

Dashboard.propTypes = {
   shoutsQueueQuery: PropTypes.shape({
      getShoutsQueue: propType(dashboardFragments.shouts.document)
   }),
   viewer: propType(dashboardFragments.viewer.document)
};

export default queryErrorHandling(shoutsQueueQuery)(Dashboard);
