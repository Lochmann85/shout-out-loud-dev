import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import './helper/initialization';

import { Grid } from 'semantic-ui-react';

import { FullHeightWrapper } from './assets/styled/Wrapper';
import Navigation from './components/navigation/Navigation';

const App = () => (
   <FullHeightWrapper>
      <Navigation />
      <Grid>
         <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={12}>Test</Grid.Column>
         </Grid.Row>
      </Grid>
   </FullHeightWrapper>
);

export default App;
