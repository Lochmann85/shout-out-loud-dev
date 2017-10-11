import React from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import './helper/initialization';

import { Grid } from 'semantic-ui-react';

import graphQLStore from './storeHandler/graphQLStore';

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

   render() {
      const { getViewerQuery, location: { state } } = this.props;

      let getViewer = null;
      if (getViewerQuery) {
         getViewer = getViewerQuery.getViewer;

         if (localStorage.getItem("jwtToken") && getViewer.token) {
            localStorage.setItem("jwtToken", getViewer.token);
         }
      }

      return (
         <FullHeightWrapper>
            <Navigation viewer={getViewer} currentPathState={state} />
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
};


graphQLStore.addFragment(App.fragments.viewer);

export default withRouter(App);
