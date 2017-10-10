import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import dateFormat from 'dateformat';

import { Table } from 'semantic-ui-react';

import roleTableRowFragments from './../graphql/fragments/roleTableRow';
import DescriptionWithEditAndDelete from './../../../components/table/DescriptionWithEditAndDelete';

class RoleTableRow extends React.Component {

   static propTypes = {
      onDeleteClick: PropTypes.func,
      role: propType(roleTableRowFragments.role.document),
      viewer: propType(roleTableRowFragments.viewer.document)
   };

   constructor(props) {
      super(props);
      this.state = {
         mouseIsOver: false
      };
   }

   render() {
      const { role, onDeleteClick } = this.props;

      let isSelected = true,
         parentOnDeleteClick = onDeleteClick;

      // if (readRoleAdministration.isAllowed(viewer.role)) {
      //    isSelected = this.state.mouseIsOver;
      // }
      // else {
      //    isSelected = false;
      // }

      // if (deleteRoleAdministration.isAllowed(viewer.role) && !role.isStatic && notOwnRole.isAllowed()) {
      //    parentOnDeleteClick = onDeleteClick;
      // }

      return (
         <Table.Row id={role.id}
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave} >
            <Table.Cell content={role.name} />
            <Table.Cell>
               <DescriptionWithEditAndDelete
                  routePrefix="role"
                  id={role.id}
                  isSelected={isSelected}
                  onDeleteClick={parentOnDeleteClick}
                  description={dateFormat(role.createdAt, "dd.mm.yyyy")} />
            </Table.Cell>
         </Table.Row>
      );
   };

   _onMouseEnter = (event) => this.setState({ mouseIsOver: true });

   _onMouseLeave = (event) => this.setState({ mouseIsOver: false });
};

export default RoleTableRow;