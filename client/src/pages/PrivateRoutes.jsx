import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import privateRoutesFragments from './privateRoutesFragments';
import RoleRoutes from './role/Routes';

const OffsetWrapper = styled.div`
   padding-top: 2rem;
`;

const PrivateRoutes = (props) => {
   const { viewer } = props;

   return (
      <OffsetWrapper>
         <Switch>
            <Route path="/role" render={
               () => <RoleRoutes viewer={viewer} />
            } />
         </Switch>
      </OffsetWrapper>
   );
};

PrivateRoutes.propTypes = {
   viewer: propType(privateRoutesFragments.viewer.document)
};

export default PrivateRoutes;