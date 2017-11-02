import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import dateFormat from 'dateformat';

import { Table } from 'semantic-ui-react';

import roleTableRowFragments from './../graphql/fragments/roleTableRow';
import DescriptionWithEditAndDelete from './../../../components/table/DescriptionWithEditAndDelete';

import {
   ReadRoleChecker,
   DeleteRoleChecker,
   NotOwnRoleChecker
} from './../../../authorization';

const readRole = new ReadRoleChecker();
const deleteRole = new DeleteRoleChecker();

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
      const { role, onDeleteClick, viewer } = this.props;

      let isSelected,
         parentOnDeleteClick;

      if (readRole.check(null, viewer)) {
         isSelected = this.state.mouseIsOver;
      }
      else {
         isSelected = false;
      }

      if (deleteRole.and(NotOwnRoleChecker).check({ roleId: role.id }, viewer) && !role.isStatic) {
         parentOnDeleteClick = onDeleteClick;
      }

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