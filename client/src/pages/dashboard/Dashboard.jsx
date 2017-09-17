import React from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import ShoutActionContainer from './components/ShoutActionContainer';
import ShoutScreen from './components/ShoutScreen';
import { HiddenWrapper, FullHeightWrapper } from './../../assets/styled/Wrapper';
import BaseLayoutLoader from './../../components/layout/BaseLayoutLoader';
import dashboardFragments from './graphql/fragments/dashboard';
import shoutsQueueQuery from './graphql/queries/shoutsQueueQuery';

const WrapperWithOffset = styled(FullHeightWrapper) `
   padding:4% 0;
`;

const Dashboard = ({ shoutsQueueQuery }) => {

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
};

Dashboard.fragments = {
   shoutsQueueQuery: PropTypes.shape({
      getShoutsQueue: propType(dashboardFragments.shouts.document)
   })
};

export default shoutsQueueQuery(Dashboard);
