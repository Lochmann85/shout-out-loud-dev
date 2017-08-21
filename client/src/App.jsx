import React from 'react';

import 'semantic-ui-css/semantic.min.css';

import { Grid } from 'semantic-ui-react';

const App = () => (
   <Grid>
      <Grid.Row>
         <Grid.Column width={2} />
         <Grid.Column width={12}>
            Test
         </Grid.Column>
      </Grid.Row>
   </Grid>
);

export default App;
