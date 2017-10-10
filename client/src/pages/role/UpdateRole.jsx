import React from 'react';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

import { InfoMessage, SegmentBackground } from './../../assets/styled/UI';

import BaseContentLayout from './../../components/layout/BaseContentLayout';
import RoleForm from './components/RoleForm';
import queryErrorHandling from './../../components/errorHandling/queryErrorHandling';
import browserHistory from './../../storeHandler/routerHistory';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';

import updateRoleFragments from './graphql/fragments/updateRole';
import updateRoleMutation from './graphql/mutations/updateRole';
import getRoleQuery from './graphql/queries/getRole';

class UpdateRole extends React.Component {

   static propTypes = {
      viewer: propType(updateRoleFragments.viewer.document),
   }

   constructor(props) {
      super(props);

      this.state = {
         errors: []
      };
   }

   render() {
      const { getRoleQuery: { getRole }, getAllRulesForRoleUpdateQuery: { getAllRules }, viewer } = this.props;

      let updateRoleContent,
         title;

      if (getRole) {
         title = `Update role: ${getRole.name}`;
         updateRoleContent = <RoleForm
            role={getRole}
            onSubmit={this._onSubmit}
            errors={this.state.errors}
            rules={getAllRules}
            submitButtonTitle="Update"
            readOnly={this._formIsReadOnly(getRole, viewer)} />;
      }
      else {
         title = "";
         updateRoleContent = <InfoMessage visible content="Role could not be found." />;
      }

      return (
         <BaseContentLayout title={title}>
            <SegmentBackground>
               {updateRoleContent}
            </SegmentBackground>
         </BaseContentLayout>
      );
   }

   _formIsReadOnly = (role, viewer) => {
      return false;
   }

   _onSubmit = (roleData) => {
      this.props.updateRole(roleData, this.props.getRoleQuery.getRole.id)
         .then(response => {
            if (response.data.updateRole) {
               browserHistory.goBack();
            }
         })
         .catch(error => mutationErrorHandling(error, this._onShowError));
   }
   _onShowError = (errors) => this.setState({ errors });
};

export default queryErrorHandling(getRoleQuery)(
   queryErrorHandling({
      document: gql`
      query getAllRulesForRoleUpdateQuery {
         getAllRules {
            ...${updateRoleFragments.rules.name}
         }
      }
      ${updateRoleFragments.rules.document}`,
      config: {
         name: "getAllRulesForRoleUpdateQuery",
      }
   })(updateRoleMutation(UpdateRole)));