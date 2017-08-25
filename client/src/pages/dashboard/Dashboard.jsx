import React from 'react';

import { Card } from 'semantic-ui-react';

import BaseLayoutLoader from './../../components/layout/BaseLayoutLoader';
import shoutsQueueQuery from './graphql/queries/shoutsQueueQuery';

const Dashboard = ({ shoutsQueueQuery }) => {

   if (shoutsQueueQuery.loading) {
      return <BaseLayoutLoader />;
   }
   else if (shoutsQueueQuery.error) {
      console.log(shoutsQueueQuery.error);
      return <div>Error</div>;
   }

   const { getShoutsQueue } = shoutsQueueQuery;

   const ShoutsGroup = getShoutsQueue.map((shout, index) =>
      <Card description={shout.message} key={index} />
   );

   return (
      <Card.Group>
         {ShoutsGroup}
      </Card.Group>
   );
};

export default shoutsQueueQuery(Dashboard);
