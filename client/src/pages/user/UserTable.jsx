import React from 'react';
import { propType } from 'graphql-anywhere';

import { Table } from 'semantic-ui-react';

import { InfoMessage, SegmentBackground } from './../../assets/styled/UI';

import userTableFragments from './graphql/fragments/userTable';
import DeleteConfirmation from './../../components/modal/DeleteConfirmation';
import UserTableRow from './components/UserTableRow';
import BaseContentLayout from './../../components/layout/BaseContentLayout';
import HeadingWithAddButton from './../../components/layout/HeadingWithAddButton';
import getAllUsersQuery from './graphql/queries/getAllUsers';
import queryErrorHandling from './../../components/errorHandling/queryErrorHandling';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';
import deleteUserMutation from './graphql/mutations/deleteUser';

import {
   ReadRoleChecker,
   ReadUserChecker,
   WriteUserChecker,
} from './../../authorization';

const readUser = new ReadUserChecker();

class UserTable extends React.Component {

   static propTypes = {
      viewer: propType(userTableFragments.viewer.document)
   };

   constructor(props) {
      super(props);

      this.state = {
         openDeleteConfirmation: false,
         errors: [],
         selectedUserId: "",
      };
   }

   render() {
      const { getAllUsersQuery: { getAllUsers }, viewer } = this.props;

      let TableContent = null,
         selectedUser = null,
         showAddButton = false;

      if (getAllUsers && Array.isArray(getAllUsers) && getAllUsers.length !== 0) {
         selectedUser = getAllUsers.find(user => user.id === this.state.selectedUserId);

         const tableRows = getAllUsers.map((user, index) =>
            <UserTableRow
               key={index}
               user={user}
               viewer={viewer}
               onDeleteClick={this._onDeleteClick} />
         );

         TableContent = <SegmentBackground>
            <Table celled compact selectable unstackable>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell width={8} content="E-Mail" />
                     <Table.HeaderCell width={4} content="Role" />
                     <Table.HeaderCell width={4} content="Created At" />
                  </Table.Row>
               </Table.Header>
               <Table.Body>
                  {tableRows}
               </Table.Body>
            </Table>
         </SegmentBackground>;
      }
      else {
         TableContent = <InfoMessage visible content="No users were found." />;
      }

      let deleteMessage = "";
      if (selectedUser) {
         deleteMessage = `The user with name "${selectedUser.name}" will be deleted.`;
      }

      if (viewer) {
         showAddButton = readUser.and(WriteUserChecker).and(ReadRoleChecker).check({}, viewer);
      }

      return (
         <BaseContentLayout title={<HeadingWithAddButton
            title="Table of all users"
            linkUrl="/user/create"
            showAddButton={showAddButton} />}>
            {TableContent}
            <DeleteConfirmation
               open={this.state.openDeleteConfirmation}
               description={deleteMessage}
               errors={this.state.errors}
               onDeleteConfirmation={this._onDeleteConfirmation}
               onCloseClick={this._onCloseClick} />
         </BaseContentLayout>
      );
   }

   _onDeleteClick = (userId) => {
      this.setState({
         openDeleteConfirmation: true,
         selectedUserId: userId,
      });
   };

   _onCloseClick = () => {
      this.setState({
         openDeleteConfirmation: false,
         errors: [],
         selectedUserId: "",
      });
   }

   _onDeleteConfirmation = () => {
      this.props.deleteUser(this.state.selectedUserId)
         .then(response => {
            if (response.data.deleteUser) {
               this._onCloseClick();
            }
         }).catch(error => mutationErrorHandling(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({ errors });

};

export default queryErrorHandling(getAllUsersQuery)(deleteUserMutation(UserTable));