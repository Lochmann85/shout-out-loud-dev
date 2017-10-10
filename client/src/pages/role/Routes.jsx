import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';

import roleRoutesFragments from './graphql/fragments/routes';

import RoleTable from './RoleTable';
import CreateRole from './CreateRole';
import UpdateRole from './UpdateRole';

const Routes = (props) => {
   const { viewer } = props;

   return (
      <Switch>
         <Route exact path="/role" render={
            (props) => <RoleTable viewer={viewer} {...props} />
         } />
         <Route path="/role/create" render={
            (props) => <CreateRole viewer={viewer} {...props} />
         } />
         <Route path="/role/update/:roleId" render={
            (props) => <UpdateRole viewer={viewer} {...props} />
         } />
      </Switch>
   );
};

Routes.propTypes = {
   viewer: propType(roleRoutesFragments.viewer.document),
};

export default Routes;