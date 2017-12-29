import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Icon, Message } from 'semantic-ui-react';

import SignupForm from './components/SignupForm';
import signupMutation from './graphql/mutations/signupMutation';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';

class SignUpModal extends React.Component {

   static propTypes = {
      onCloseClick: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         errors: [],
         isConfirmationVisible: false,
      };
   }

   render() {
      const { onCloseClick, signup, ...others } = this.props; //eslint-disable-line no-unused-vars

      return (
         <Modal size="tiny" {...others} closeIcon={<Icon name="close" onClick={this._onCloseClick} />}>
            <Modal.Header content="Sign up" />
            <Modal.Content>
               <SignupForm
                  onSubmit={this._onSubmit}
                  errors={this.state.errors}
                  readOnly={this.state.isConfirmationVisible}
               />
               <Message positive visible hidden={!this.state.isConfirmationVisible} content="Please follow the instructions on the email to confirm your account." />
            </Modal.Content>
         </Modal>
      );
   }

   _onSubmit = (credentials) => {
      this.props.signup(credentials)
         .then(() => this.setState({
            errors: [],
            isConfirmationVisible: true
         }))
         .catch(error => mutationErrorHandling(error, this._onShowError));
   }

   _onShowError = (errors) => this.setState({
      errors,
      isConfirmationVisible: false,
   });

   _onCloseClick = () => {
      this.setState({
         errors: [],
         isConfirmationVisible: false,
      }, () => {
         this.props.onCloseClick();
      });
   }

};

export default signupMutation(SignUpModal);
