import React from 'react';
import { propType } from 'graphql-anywhere';

import { Table } from 'semantic-ui-react';

import { InfoMessage, SegmentBackground } from './../../assets/styled/UI';

import DeleteConfirmation from './../../components/modal/DeleteConfirmation';
import getAllRolesQuery from './graphql/queries/getAllRoles';
import roleTableFragments from './graphql/fragments/roleTable';
import HeadingWithAddButton from './../../components/layout/HeadingWithAddButton';
import BaseContentLayout from './../../components/layout/BaseContentLayout';
import queryErrorHandling from './../../components/errorHandling/queryErrorHandling';
import RoleTableRow from './components/RoleTableRow';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';
import deleteRoleMutation from './graphql/mutations/deleteRole';

import {
   ReadRoleChecker,
   WriteRoleChecker,
} from './../../authorization';

const readRole = new ReadRoleChecker();

class RoleTable extends React.Component {

   static propTypes = {
      viewer: propType(roleTableFragments.viewer.document)
   }

   constructor(props) {
      super(props);
      this.state = {
         openDeleteConfirmation: false,
         errors: [],
         selectedRoleId: "",
      };
   }

   render() {
      const { getAllRolesQuery: { getAllRoles }, viewer } = this.props;

      let TableContent = null,
         selectedRole = null,
         showAddButton = false;

      if (getAllRoles && Array.isArray(getAllRoles) && getAllRoles.length !== 0) {
         selectedRole = getAllRoles.find(role => role.id === this.state.selectedRoleId);

         const tableRows = getAllRoles.map((role, index) =>
            <RoleTableRow
               key={index}
               role={role}
               viewer={viewer}
               onDeleteClick={this._onDeleteClick} />
         );

         TableContent = <SegmentBackground>
            <Table celled compact selectable unstackable>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell width={11} content="Name" />
                     <Table.HeaderCell width={5} content="Created At" />
                  </Table.Row>
               </Table.Header>
               <Table.Body>
                  {tableRows}
               </Table.Body>
            </Table>
         </SegmentBackground>;
      }
      else {
         TableContent = <InfoMessage visible content="No roles were found." />;
      }

      let deleteMessage = "";
      if (selectedRole) {
         deleteMessage = `The role with name "${selectedRole.name}" will be deleted.`;
      }

      if (viewer) {
         showAddButton = readRole.and(WriteRoleChecker).check(null, viewer);
      }

      return (
         <BaseContentLayout title={<HeadingWithAddButton
            title="Table of all roles"
            linkUrl="/role/create"
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

   _onDeleteClick = (roleId) => {
      this.setState({
         openDeleteConfirmation: true,
         selectedRoleId: roleId,
      });
   };

   _onCloseClick = () => {
      this.setState({
         openDeleteConfirmation: false,
         errors: [],
         selectedRoleId: "",
      });
   }

   _onDeleteConfirmation = () => {
      this.props.deleteRole(this.state.selectedRoleId)
         .then(response => {
            if (response.data.deleteRole) {
               this._onCloseClick();
            }
         }).catch(error => mutationErrorHandling(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({ errors });

};

export default queryErrorHandling(getAllRolesQuery)(deleteRoleMutation(RoleTable));