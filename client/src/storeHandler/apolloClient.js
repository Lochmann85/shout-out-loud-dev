import { ApolloClient } from 'react-apollo';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import fragmentMatcher from './fragmentMatcher';

let serverUri = "ws://localhost:8000/graphql";

if (process.env.NODE_ENV === "production") {
   serverUri = "ws://shout-out-loud.herokuapp.com/graphql";
}

const webSocketClient = new SubscriptionClient(serverUri, {
   reconnect: true
});

webSocketClient.use([{
   applyMiddleware: (request, next) => {
      if (!request.variables) {
         request.variables = {};
      }

      const jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken) {
         request.variables.token = jwtToken;
      }

      next();
   }
}]);

const apolloClient = new ApolloClient({
   addTypename: true,
   fragmentMatcher,
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