import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';

import routesFragments from './routesFragments';
import Dashboard from './dashboard/Dashboard';
import PrivateRoutes from './PrivateRoutes';

const Routes = () => (
   <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/" render={(props) => <PrivateRoutes {...props} />} />
   </Switch>
);

Routes.fragments = {
   viewer: propType(routesFragments.viewer.document)
};

export default Routes;
