import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';

import routesFragments from './routesFragments';
import Dashboard from './dashboard/Dashboard';
import ErrorPage from './error/ErrorPage';
import Signup from './authentication/Signup';
import ResetPassword from './authentication/ResetPassword';
import PrivateRoutes from './PrivateRoutes';

const Routes = ({ viewer }) => (
   <Switch>
      <Route exact path="/" render={(props) => <Dashboard {...props} viewer={viewer} />} />
      <Route path="/error" component={ErrorPage} />
      <Route path="/signup/:token" component={Signup} />
      <Route path="/resetPassword/:token" component={ResetPassword} />
      <Route path="/" render={(props) => <PrivateRoutes {...props} viewer={viewer} />} />
   </Switch>
);

Routes.propTypes = {
   viewer: propType(routesFragments.viewer.document)
};

Routes.fragments = {
   viewer: routesFragments.viewer
};

export default Routes;
