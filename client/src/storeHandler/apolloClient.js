import { ApolloClient } from 'react-apollo';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let serverUri = "ws://localhost:8080/graphql";

if (process.env.NODE_ENV === "production") {
   serverUri = "ws://app-shout-out-loud.a3c1.starter-us-west-1.openshiftapps.com/graphql";
}

const webSocketClient = new SubscriptionClient(serverUri, {
   reconnect: true
});

const apolloClient = new ApolloClient({
   addTypename: true,
   dataIdFromObject: object => {
      if (object.id && object.__typename) { // eslint-disable-line no-underscore-dangle
         return object.__typename + object.id; // eslint-disable-line no-underscore-dangle
      }
      return null;
   },
   initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
   networkInterface: webSocketClient,
   ssrForceFetchDelay: 100
});

export default apolloClient;