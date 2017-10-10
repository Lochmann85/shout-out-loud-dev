import React from 'react';
import gql from 'graphql-tag';

import { SegmentBackground } from './../../assets/styled/UI';

import BaseContentLayout from './../../components/layout/BaseContentLayout';
import UserForm from './components/UserForm';
import browserHistory from './../../storeHandler/routerHistory';
import createUserMutation from './graphql/mutations/createUser';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';
import createUserFragments from './graphql/fragments/createUser';
import queryErrorHandling from './../../components/errorHandling/queryErrorHandling';

class CreateUser extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         errors: []
      };
   }

   render() {
      const allRolesQuery = this.props.getAllRolesForUserCreateQuery;
      let roles = null;
      if (allRolesQuery) {
         roles = allRolesQuery.getAllRoles;
      }

      return (
         <BaseContentLayout title={"Create a new user"}>
            <SegmentBackground>
               <UserForm
                  onSubmit={this._onSubmit}
                  errors={this.state.errors}
                  submitButtonTitle="Create"
                  roles={roles}
                  readOnly={false} />
            </SegmentBackground>
         </BaseContentLayout>
      );
   }

   _onSubmit = (userData) => {
      this.props.createUser(userData).then(response => {
         if (response.data.createUser) {
            browserHistory.push("/user");
         }
      }).catch(error => mutationErrorHandling(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({ errors });
};

export default queryErrorHandling({
   document: gql`
   query getAllRolesForUserCreateQuery {
      getAllRoles {
         ...${createUserFragments.roles.name}
      }
   }
   ${createUserFragments.roles.document}`,
   config: {
      name: "getAllRolesForUserCreateQuery",
   }
})(createUserMutation(CreateUser));