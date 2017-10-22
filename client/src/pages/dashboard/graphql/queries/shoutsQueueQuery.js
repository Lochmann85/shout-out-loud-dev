import gql from 'graphql-tag';

import graphQLStore from './../../../../storeHandler/graphQLStore';

let query;

const shoutsFragment = graphQLStore.findFragment("DashboardShouts");
if (shoutsFragment) {
   const shoutsQueueQuery = gql`
   query shoutsQueueQuery {
      getShoutsQueue {
         ...${shoutsFragment.name}
      }
   }
   ${shoutsFragment.document}`;

   const shoutsQueueSubscription = gql`
   subscription shoutsQueueSubscription {
      shoutsQueueChanged {
         ...${shoutsFragment.name}
      }
   }
   ${shoutsFragment.document}`;

   query = {
      document: shoutsQueueQuery,
      config: {
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
      }
   };

   graphQLStore.addQuery(query);
}
else {
   throw new Error("FATAL ERROR, could not generate shoutsQueueQuery");
}

export default query;