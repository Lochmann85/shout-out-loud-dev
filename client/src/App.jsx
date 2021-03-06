import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, gql, compose } from 'react-apollo';
import styled from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import './helper/initialization';

import { Grid } from 'semantic-ui-react';

import {
   windowSize,
   windowIsMobile,
   windowIsLandscape,
   addWindowObserver,
   removeWindowObserver
} from './storeHandler/windowSizeStore';
import graphQLStore from './storeHandler/graphQLStore';
import browserHistory from './storeHandler/routerHistory';
import apolloClient from './storeHandler/apolloClient';
import RouterMatcher from './helper/RouterMatcher';
import { checkForUnauthorizedInErrors } from './components/errorHandling/checkForErrorTypes';
import { addFunctionalityToViewerData } from './storeHandler/viewerObject';

import BaseLayoutLoader from './components/layout/BaseLayoutLoader';
import { FullHeightWrapper } from './assets/styled/Wrapper';
import Navigation from './components/navigation/Navigation';
import Routes from './pages/Routes';

const FullHeightGrid = styled(Grid) `
   min-height: 500px;
   min-width: 280px;
   height: ${props => props.height}px!important;
`;

const AppRow = styled(Grid.Row) `
   padding-bottom: 0!important;
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

   constructor(props) {
      super(props);

      this.state = {
         height: this._calculateHeight(),
      };
   }

   componentDidMount() {
      addWindowObserver(this);
   }

   componentWillReceiveProps(nextProp) {
      if (nextProp.getViewerQuery) {
         const query = nextProp.getViewerQuery;

         if (query && !query.loading && query.error) {
            checkForUnauthorizedInErrors(query.error);
         }
      }
   }

   _calculateHeight = () => {
      if (windowIsMobile()) {
         if (windowIsLandscape()) {
            return windowSize.width * 1.1;
         }
         else {
            return windowSize.height - 42;
         }
      }
      else {
         return windowSize.height - 59;
      }
   }

   componentWillUnmount() {
      removeWindowObserver(this);
   }

   updateOnResize = () => {
      this.setState({ height: this._calculateHeight() });
   }

   render() {
      const { getViewerQuery, location: { state } } = this.props;

      if (getViewerQuery && getViewerQuery.loading) {
         return <BaseLayoutLoader />;
      }
      else {
         let getViewer = null,
            viewer = null;
         if (getViewerQuery && !getViewerQuery.error) {
            getViewer = getViewerQuery.getViewer;

            if (localStorage.getItem("jwtToken") && getViewer.token) {
               localStorage.setItem("jwtToken", getViewer.token);
            }
            viewer = addFunctionalityToViewerData(getViewer);
         }

         return (
            <FullHeightWrapper>
               <Navigation
                  viewer={viewer}
                  currentPathState={state}
                  onLoginSuccess={this._handleLoginSuccess}
                  onLogout={this._handleLogout} />
               <FullHeightGrid container height={this.state.height}>
                  <AppRow>
                     <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} widescreen={2} />
                     <Grid.Column mobile={16} tablet={14} computer={14} largeScreen={12} widescreen={12}>
                        <Routes viewer={viewer} />
                     </Grid.Column>
                  </AppRow>
               </FullHeightGrid>
            </FullHeightWrapper>
         );
      }
   }

   _handleLoginSuccess = (token) => {
      localStorage.setItem("jwtToken", token);
      const routerMatcher = new RouterMatcher(this.props);
      if (routerMatcher.isMatchingExactly("/")) {
         this.props.getViewerQuery.refetch().catch(checkForUnauthorizedInErrors);
      }
      else {
         browserHistory.push("/", { resetStore: true });
      }
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

export default compose(
   withRouter,
   graphql(
      gql`query getViewerQuery {
         getViewer {
            ...${App.fragments.viewer.name}
         }
      }
      ${App.fragments.viewer.document}`,
      {
         name: "getViewerQuery",
         skip: (ownProps) => {
            const routerMatcher = new RouterMatcher(ownProps);

            if (routerMatcher.isMatching("/signup") ||
               routerMatcher.isMatching("/error") ||
               routerMatcher.isMatching("/resetPassword")) {
               return true;
            }
            return false;
         }
      }
   )
)(App);
