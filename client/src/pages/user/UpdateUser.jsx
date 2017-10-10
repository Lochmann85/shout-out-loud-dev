import React from 'react';
import { propType } from 'graphql-anywhere';
import gql from 'graphql-tag';

import { InfoMessage, SegmentBackground } from './../../assets/styled/UI';

import updateUserFragments from './graphql/fragments/updateUser';
import BaseContentLayout from './../../components/layout/BaseContentLayout';
import UserForm from './components/UserForm';
import browserHistory from './../../storeHandler/routerHistory';
import updateUserMutation from './graphql/mutations/updateUser';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';
import queryErrorHandling from './../../components/errorHandling/queryErrorHandling';
import getUserQuery from './graphql/queries/getUser';

class UpdateUser extends React.Component {

   static propTypes = {
      viewer: propType(updateUserFragments.viewer.document),
   }

   constructor(props) {
      super(props);

      this.state = {
         errors: []
      };
   }

   render() {
      const { getUserQuery: { getUser }, getAllRolesForUserUpdateQuery, viewer } = this.props;

      let updateUserContent,
         title;

      if (getUser) {
         let roles = null;
         if (getAllRolesForUserUpdateQuery) {
            roles = getAllRolesForUserUpdateQuery.getAllRoles;
         }

         title = `Update user: ${getUser.name}`;
         updateUserContent = <SegmentBackground>
            <UserForm
               user={getUser}
               onSubmit={this._onSubmit}
               errors={this.state.errors}
               submitButtonTitle="Update"
               roles={roles}
               readOnly={this._formIsReadOnly(getUser, viewer)} />
         </SegmentBackground>;
      }
      else {
         title = "";
         updateUserContent = <InfoMessage visible content="User could not be found." />;
      }

      return (
         <BaseContentLayout title={title}>
            {updateUserContent}
         </BaseContentLayout>
      );
   }

   _formIsReadOnly = (user, viewer) => {
      return false;
   }

   _onSubmit = (userData) => {
      this.props.updateUser(userData, this.props.getUserQuery.getUser.id, 0/*this.props.viewer.id*/)
         .then(response => {
            if (response.data.updateUser) {
               browserHistory.goBack();
            }
         })
         .catch(error => mutationErrorHandling(error, this._onShowError));
   };
   _onShowError = (errors) => this.setState({ errors });
};

export default queryErrorHandling(getUserQuery)(
   queryErrorHandling({
      document: gql`
      query getAllRolesForUserUpdateQuery {
         getAllRoles {
            ...${updateUserFragments.roles.name}
         }
      }
      ${updateUserFragments.roles.document}`,
      config: {
         name: "getAllRolesForUserUpdateQuery",
         skip: ({ viewer, getUserQuery }) => {
            return false;
         }
      }
   })(updateUserMutation(UpdateUser)));