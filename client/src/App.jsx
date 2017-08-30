import React from 'react';
import styled from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import './helper/initialization';

import { Grid } from 'semantic-ui-react';

import { FullHeightWrapper } from './assets/styled/Wrapper';
import Navigation from './components/navigation/Navigation';
import Routes from './Routes';

const FullHeightGrid = styled(Grid) `
   height:calc(100% - 59px);
`;

const AppRow = styled(Grid.Row) `
   padding-bottom:0!important;
`;

const App = () => (
   <FullHeightWrapper>
      <Navigation />
      <FullHeightGrid container>
         <AppRow>
            <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} />
            <Grid.Column mobile={16} tablet={14} computer={14} largeScreen={12}>
               <Routes />
            </Grid.Column>
         </AppRow>
      </FullHeightGrid>
   </FullHeightWrapper>
);

export default App;
