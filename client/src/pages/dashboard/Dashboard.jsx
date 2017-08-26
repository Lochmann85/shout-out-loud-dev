import React from 'react';
import styled from 'styled-components';

import ShoutActionContainer from './components/ShoutActionContainer';
import ShoutScreen from './components/ShoutScreen';
import { HiddenWrapper, FullHeightWrapper } from './../../assets/styled/Wrapper';
import BaseLayoutLoader from './../../components/layout/BaseLayoutLoader';
import shoutsQueueQuery from './graphql/queries/shoutsQueueQuery';

const WrapperWithOffset = styled(FullHeightWrapper) `
padding:3%;
`;

const Dashboard = ({ shoutsQueueQuery }) => {

   if (shoutsQueueQuery.loading) {
      return <BaseLayoutLoader />;
   }
   else if (shoutsQueueQuery.error) {
      console.log(shoutsQueueQuery.error);
      return <BaseLayoutLoader />;
   }

   const { getShoutsQueue } = shoutsQueueQuery;

   return (
      <WrapperWithOffset>
         <HiddenWrapper>
            <h1>Shout out your thought!</h1>
         </HiddenWrapper>
         <ShoutScreen shoutsQueue={getShoutsQueue} />
         <ShoutActionContainer shoutsQueue={getShoutsQueue} />
      </WrapperWithOffset >
   );
};

export default shoutsQueueQuery(Dashboard);
