import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';

import userRoutesFragments from './graphql/fragments/routes';

import UserTable from './UserTable';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

const Routes = ({ viewer }) => (
   <Switch>
      <Route exact path="/user" render={
         (routerProps) => <UserTable viewer={viewer} {...routerProps} />
      } />
      <Route exact path="/user/create" render={
         (routerProps) => <CreateUser {...routerProps} />
      } />
      <Route exact path="/user/update/:userId" render={
         (routerProps) => <UpdateUser viewer={viewer}{...routerProps} />
      } />
   </Switch>
);

Routes.propTypes = {
   viewer: propType(userRoutesFragments.viewer.document),
};

export default Routes;