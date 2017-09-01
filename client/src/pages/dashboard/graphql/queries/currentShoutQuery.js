import { graphql, gql } from 'react-apollo';

const currentShoutQuery = gql`
query currentShoutQuery {
   getCurrentShout {
      message
      type
   }
}
`;

const currentShoutSubscription = gql`
subscription currentShoutSubscription {
   currentShoutChanged {
      message
      type
   }
}
`;

export default graphql(currentShoutQuery, {
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
});