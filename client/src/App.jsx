import React from 'react';
import styled from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import './helper/initialization';

import { Grid } from 'semantic-ui-react';

import { FullHeightWrapper } from './assets/styled/Wrapper';
import Navigation from './components/navigation/Navigation';
import Routes from './Routes';

const FullHeightGrid = styled(Grid) `
height:calc(100% - 94px);
`;

const App = () => (
   <FullHeightWrapper>
      <Navigation />
      <FullHeightGrid container>
         <Grid.Row>
            <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} />
            <Grid.Column mobile={16} tablet={14} computer={14} largeScreen={12}>
               <Routes />
            </Grid.Column>
         </Grid.Row>
      </FullHeightGrid>
   </FullHeightWrapper>
);

export default App;
