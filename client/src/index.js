import 'babel-polyfill';
import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';

import apolloClient from './storeHandler/apolloClient';
import routerHistory from './storeHandler/routerHistory';
import { initializeStore } from './storeHandler/windowSizeStore';

import App from './App';

initializeStore(window);

ReactDOM.render((
   <ApolloProvider client={apolloClient}>
      <Router history={routerHistory}>
         <App />
      </Router>
   </ApolloProvider>
), document.getElementById("root"));
