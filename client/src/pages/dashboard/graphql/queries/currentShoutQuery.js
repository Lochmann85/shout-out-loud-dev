import gql from 'graphql-tag';

import graphQLStore from './../../../../storeHandler/graphQLStore';

let query;

const shoutsFragment = graphQLStore.findFragment("ShoutScreenShouts");
if (shoutsFragment) {
   const currentShoutQuery = gql`
   query currentShoutQuery {
      getCurrentShout {
         ...${shoutsFragment.name}
      }
   }
   ${shoutsFragment.document}`;

   const currentShoutSubscription = gql`
   subscription currentShoutSubscription {
      currentShoutChanged {
         ...${shoutsFragment.name}
      }
   }
   ${shoutsFragment.document}`;

   query = {
      document: currentShoutQuery,
      config: {
         name: "currentShoutQuery",
         props: props => ({
            currentShoutQuery: {
               ...props.currentShoutQuery,
               subscribeToCurrentShoutChanged: () => {

                  return props.currentShoutQuery.subscribeToMore({
                     document: currentShoutSubscription,

                     updateQuery: (previousResult, { subscriptionData }) => {
                        if (subscriptionData.data) {
                           const newShout = Object.assign({}, previousResult, {
                              getCurrentShout: subscriptionData.data.currentShoutChanged,
                           });
                           return newShout;
                        }
                        return previousResult;
                     }

                  });

               },
            }
         }),
      }
   };
}
else {
   throw new Error("FATAL ERROR, could not generate currentShoutQuery");
}

export default query;