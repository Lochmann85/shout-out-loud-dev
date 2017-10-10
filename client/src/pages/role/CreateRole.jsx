import React from 'react';

import { SegmentBackground } from './../../assets/styled/UI';

import RoleForm from './components/RoleForm';
import browserHistory from './../../storeHandler/routerHistory';
import createRoleMutation from './graphql/mutations/createRole';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';
import BaseContentLayout from './../../components/layout/BaseContentLayout';

class CreateRole extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         errors: []
      };
   }

   render() {
      return (
         <BaseContentLayout title={"Create a new role"}>
            <SegmentBackground>
               <RoleForm
                  onSubmit={this._onSubmit}
                  errors={this.state.errors}
                  submitButtonTitle="Create"
                  readOnly={false} />
            </SegmentBackground>
         </BaseContentLayout>
      );
   }

   _onSubmit = (roleData) => {
      this.props.createRole(roleData).then(response => {
         if (response.data.createRole) {
            browserHistory.push("/role");
         }
      }).catch(error => mutationErrorHandling(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({ errors });
};

export default createRoleMutation(CreateRole);