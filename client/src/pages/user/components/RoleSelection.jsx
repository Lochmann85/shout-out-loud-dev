import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import { Dropdown } from 'semantic-ui-react';

import roleSelectionFragments from './../graphql/fragments/roleSelection';

const RoleSelection = ({ roles, defaultValue, readOnly, ...others }) => {

   let options = [];
   if (roles) {
      options = roles.map(role => {
         return {
            key: role.id,
            value: role.id,
            text: role.name,
         };
      });
   }

   return (
      <Dropdown
         search
         options={options}
         defaultValue={defaultValue ? defaultValue : ""}
         disabled={readOnly}
         {...others} />
   );
};

RoleSelection.propTypes = {
   roles: PropTypes.arrayOf(propType(roleSelectionFragments.roles.document)),
   readOnly: PropTypes.bool.isRequired,
};

export default RoleSelection;