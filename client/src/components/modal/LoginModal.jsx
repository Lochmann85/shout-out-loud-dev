import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Icon } from 'semantic-ui-react';

import LoginForm from './components/LoginForm';
import loginMutation from './graphql/mutations/loginMutation';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';

class LoginModal extends React.Component {

   static propTypes = {
      onCloseClick: PropTypes.func.isRequired,
      onLoginSuccess: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         errors: []
      };
   }

   render() {
      const { onCloseClick, login, onLoginSuccess, ...others } = this.props; //eslint-disable-line no-unused-vars

      return (
         <Modal size="tiny" {...others} closeIcon={<Icon name="close" onClick={this._onCloseClick} />}>
            <Modal.Header content="Log In" />
            <Modal.Content>
               <LoginForm onSubmit={this._onSubmit} errors={this.state.errors} />
            </Modal.Content>
         </Modal>
      );
   }

   _onSubmit = (credentials) => {
      this.props.login(credentials).then(response => {
         if (response.data.login) {
            this.props.onLoginSuccess(response.data.login.token);
         }
      }).catch(error => mutationErrorHandling(error, this._onShowError));
   }

   _onShowError = (errors) => this.setState({ errors });

   _onCloseClick = () => {
      this.setState({ errors: [] }, () => {
         this.props.onCloseClick();
      });
   }

};

export default loginMutation(LoginModal);
