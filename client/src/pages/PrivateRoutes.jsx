import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';

import { TopOffsetWrapper } from './../assets/styled/Wrapper';

import privateRoutesFragments from './privateRoutesFragments';
import RoleRoutes from './role/Routes';
import UserRoutes from './user/Routes';

const PrivateRoutes = (props) => {
   const { viewer } = props;

   return (
      <TopOffsetWrapper>
         <Switch>
            <Route path="/role" render={
               () => <RoleRoutes viewer={viewer} />
            } />
            <Route path="/user" render={
               () => <UserRoutes viewer={viewer} />
            } />
         </Switch>
      </TopOffsetWrapper>
   );
};

PrivateRoutes.propTypes = {
   viewer: propType(privateRoutesFragments.viewer.document)
};

export default PrivateRoutes;