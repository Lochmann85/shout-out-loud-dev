import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

import { Modal, Icon } from 'semantic-ui-react';

import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import loginMutation from './graphql/mutations/loginMutation';
import forgotPasswordMutation from './graphql/mutations/forgotPasswordMutation';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';

class LoginModal extends React.Component {

   static propTypes = {
      onCloseClick: PropTypes.func.isRequired,
      onLoginSuccess: PropTypes.func.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         errors: [],
         isLogin: true,
         forgotPasswordSuccess: false,
      };
   }

   render() {
      const { onCloseClick, login, onLoginSuccess, forgotPassword, ...others } = this.props; //eslint-disable-line no-unused-vars

      let modalContent,
         headerText;
      if (this.state.isLogin) {
         headerText = "Log In";
         modalContent = <LoginForm
            onSubmit={this._handleLoginSubmit}
            onChangeToForgotPassword={this._handleChangeToForgotPassword}
            errors={this.state.errors} />;
      }
      else {
         headerText = "Forgot password";
         modalContent = <ForgotPasswordForm
            onSubmit={this._handleForgotPasswordSubmit}
            errors={this.state.errors}
            onChangeToLogin={this._handleChangeToLogin}
            forgotPasswordSuccess={this.state.forgotPasswordSuccess} />;
      }

      return (
         <Modal size="tiny" {...others} closeIcon={<Icon name="close" onClick={this._onCloseClick} />}>
            <Modal.Header content={headerText} />
            <Modal.Content>
               {modalContent}
            </Modal.Content>
         </Modal>
      );
   }

   _handleChangeToForgotPassword = () => this.setState({
      isLogin: false,
      errors: []
   });

   _handleChangeToLogin = () => this.setState({
      isLogin: true,
      errors: [],
      forgotPasswordSuccess: false,
   });

   _handleLoginSubmit = (credentials) => {
      this.props.login(credentials).then(response => {
         if (response.data.login) {
            this.props.onLoginSuccess(response.data.login.token);
         }
      }).catch(error => mutationErrorHandling(error, this._onShowError));
   }

   _handleForgotPasswordSubmit = (email) => {
      this.props.forgotPassword(email).then(response => {
         if (response.data.forgotPassword) {
            this.setState({
               errors: [],
               forgotPasswordSuccess: true,
            });
         }
      }).catch(error => mutationErrorHandling(error, this._onShowError));
   }

   _onShowError = (errors) => this.setState({ errors });

   _onCloseClick = () => {
      this.setState({
         isLogin: true,
         errors: [],
         forgotPasswordSuccess: false,
      }, () => {
         this.props.onCloseClick();
      });
   }

};

export default compose(
   loginMutation,
   forgotPasswordMutation,
)(LoginModal);
