import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';

// import { or } from './../helper/compositions';
// import {
//    userAdministration,
//    roleAdministration,
//    self
// } from './../components/authorization';
import privateRoutesFragments from './privateRoutesFragments';

const PrivateRoutes = (props) => {
   const { viewer } = props;

   return (
      <Switch>
         <Route exact path="/" render={() => (<div>{viewer}</div>)} />
      </Switch>
   );
};

PrivateRoutes.propTypes = {
   viewer: propType(privateRoutesFragments.viewer.document)
};

export default PrivateRoutes;