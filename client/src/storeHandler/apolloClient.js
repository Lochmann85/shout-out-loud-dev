import { ApolloClient } from 'react-apollo';
import { createNetworkInterface } from 'apollo-client';

let serverUri = "http://localhost:3001/graphql";

if (process.env.NODE_ENV === "production") {
   serverUri = "http://app-shout-out-loud.a3c1.starter-us-west-1.openshiftapps.com/graphql";
}

const network = createNetworkInterface({
   uri: serverUri,
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
   networkInterface: network,
   ssrForceFetchDelay: 100
});

export default apolloClient;