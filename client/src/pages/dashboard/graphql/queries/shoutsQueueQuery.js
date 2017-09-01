import { graphql, gql } from 'react-apollo';

const shoutsQueueQuery = gql`
query shoutsQueueQuery {
   getShoutsQueue {
      message
      type
   }
}
`;

const shoutsQueueSubscription = gql`
subscription shoutsQueueSubscription {
   shoutsQueueChanged {
      message
      type
   }
}
`;

export default graphql(shoutsQueueQuery, {
   name: "shoutsQueueQuery",
   props: props => ({
      shoutsQueueQuery: {
         ...props.shoutsQueueQuery,
         subscribeToShoutsQueueChanged: () => {

            return props.shoutsQueueQuery.subscribeToMore({
               document: shoutsQueueSubscription,

               updateQuery: (previousResult, { subscriptionData }) => {
                  if (subscriptionData.data && subscriptionData.data.shoutsQueueChanged) {
                     const newQueue = Object.assign({}, previousResult, {
                        getShoutsQueue: subscriptionData.data.shoutsQueueChanged,
                     });
                     return newQueue;
                  }
                  return previousResult;
               }

            });

         },
      }
   }),
});