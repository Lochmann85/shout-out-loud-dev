import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import dateFormat from 'dateformat';

import { Table } from 'semantic-ui-react';

import userTableRowFragments from './../graphql/fragments/userTableRow';

import DescriptionWithEditAndDelete from './../../../components/table/DescriptionWithEditAndDelete';

import {
   ReadUserChecker,
   DeleteUserChecker,
   ReadRoleChecker,
   SelfChecker,
   NotSelfChecker,
} from './../../../authorization';

const readUser = new ReadUserChecker();
const deleteUser = new DeleteUserChecker();
const self = new SelfChecker();

class UserTableRow extends React.Component {

   static propTypes = {
      onDeleteClick: PropTypes.func,
      user: propType(userTableRowFragments.user.document),
      viewer: propType(userTableRowFragments.viewer.document)
   };

   constructor(props) {
      super(props);

      this.state = {
         mouseIsOver: false
      };
   }

   render() {
      const { user, onDeleteClick, viewer } = this.props;

      let isSelected,
         parentOnDeleteClick = null;

      if (readUser.and(ReadRoleChecker).check({}, viewer)) {
         isSelected = this.state.mouseIsOver;
      }
      else if (self.check({ userId: user.id }, viewer)) {
         isSelected = this.state.mouseIsOver;
      }
      else {
         isSelected = false;
      }

      if (deleteUser.and(NotSelfChecker).check({ userId: user.id }, viewer)) {
         parentOnDeleteClick = onDeleteClick;
      }

      return (
         <Table.Row id={user.id}
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave} >
            <Table.Cell content={user.email} />
            <Table.Cell content={user.role.name} />
            <Table.Cell>
               <DescriptionWithEditAndDelete
                  routePrefix="user"
                  id={user.id}
                  isSelected={isSelected}
                  onDeleteClick={parentOnDeleteClick}
                  description={dateFormat(user.createdAt, "dd.mm.yyyy")} />
            </Table.Cell>
         </Table.Row>
      );
   };

   _onMouseEnter = (event) => this.setState({ mouseIsOver: true });

   _onMouseLeave = (event) => this.setState({ mouseIsOver: false });
};

export default UserTableRow;