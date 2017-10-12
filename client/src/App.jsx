import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import styled from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import './helper/initialization';

import { Grid } from 'semantic-ui-react';

import graphQLStore from './storeHandler/graphQLStore';
import browserHistory from './storeHandler/routerHistory';
import apolloClient from './storeHandler/apolloClient';
import RouterMatcher from './helper/RouterMatcher';
import { checkForUnauthorizedInErrors } from './components/errorHandling/checkForErrorTypes';

import BaseLayoutLoader from './components/layout/BaseLayoutLoader';
import { FullHeightWrapper } from './assets/styled/Wrapper';
import Navigation from './components/navigation/Navigation';
import Routes from './pages/Routes';

const FullHeightGrid = styled(Grid) `
   height:calc(100% - 59px);
   @media only screen and (max-width: 767px) {
      height:calc(100% - 41px);
   }
`;

const AppRow = styled(Grid.Row) `
   padding-bottom:0!important;
`;

class App extends React.Component {

   static fragments = {
      viewer: {
         name: "RootViewer",
         typeName: "Viewer",
         document: gql`
         fragment RootViewer on Viewer {
            token
            ...${Routes.fragments.viewer.name}
            ...${Navigation.fragments.viewer.name}
         }
         ${Routes.fragments.viewer.document}
         ${Navigation.fragments.viewer.document}`
      }
   };

   componentWillReceiveProps(nextProp) {
      if (nextProp.getViewerQuery) {
         const query = nextProp.getViewerQuery;

         if (query && !query.loading && query.error) {
            checkForUnauthorizedInErrors(query.error);
         }
      }
   }

   render() {
      const { getViewerQuery, location: { state } } = this.props;

      if (getViewerQuery && getViewerQuery.loading) {
         return <BaseLayoutLoader />;
      }
      else {
         let getViewer = null;
         if (getViewerQuery && !getViewerQuery.error) {
            getViewer = getViewerQuery.getViewer;

            if (localStorage.getItem("jwtToken") && getViewer.token) {
               localStorage.setItem("jwtToken", getViewer.token);
            }
         }

         return (
            <FullHeightWrapper>
               <Navigation
                  viewer={getViewer}
                  currentPathState={state}
                  onLoginSuccess={this._handleLoginSuccess}
                  onLogout={this._handleLogout} />
               <FullHeightGrid container>
                  <AppRow>
                     <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} widescreen={2} />
                     <Grid.Column mobile={16} tablet={14} computer={14} largeScreen={12} widescreen={12}>
                        <Routes viewer={getViewer} />
                     </Grid.Column>
                  </AppRow>
               </FullHeightGrid>
            </FullHeightWrapper>
         );
      }
   }

   _handleLoginSuccess = (token) => {
      localStorage.setItem("jwtToken", token);
      this.props.getViewerQuery.refetch().catch(checkForUnauthorizedInErrors);
   };

   _handleLogout = () => {
      localStorage.removeItem("jwtToken");
      const routerMatcher = new RouterMatcher(this.props);

      if (routerMatcher.isMatchingExactly("/")) {
         apolloClient.resetStore().catch(checkForUnauthorizedInErrors);
      }
      else {
         browserHistory.push("/", { resetStore: true });
      }
   }
};

graphQLStore.addFragment(App.fragments.viewer);

export default withRouter(graphql(
   gql`query getViewerQuery {
      getViewer {
         ...${App.fragments.viewer.name}
      }
   }
   ${App.fragments.viewer.document}`,
   { name: "getViewerQuery" }
)(App));
