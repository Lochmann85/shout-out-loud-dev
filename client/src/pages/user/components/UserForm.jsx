import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Message, Form, Button } from 'semantic-ui-react';

import { ColoredFormField } from './../../../assets/styled/UI';
import { BasicFlexWrapper } from './../../../assets/styled/Wrapper';

import userFormFragments from './../graphql/fragments/userForm';
import browserHistory from './../../../storeHandler/routerHistory';
import errorsProps from './../../../helper/errorsProps';
import checkForErrorInInput from './../../../helper/validation';
import PasswordChanger from './PasswordChanger';
import RoleSelection from './RoleSelection';

const ButtonWithOffset = styled(Button) `
margin-left: 0.75rem!important;
`;

class UserForm extends React.Component {

   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      user: propType(userFormFragments.user.document),
      roles: PropTypes.arrayOf(propType(userFormFragments.roles.document)),
      submitButtonTitle: PropTypes.string.isRequired,
      readOnly: PropTypes.bool.isRequired,
      errors: errorsProps,
   }

   constructor(props) {
      super(props);

      this.state = {
         email: props.user ? props.user.email : "",
         name: props.user ? props.user.name : "",
         password: "",
         roleId: props.user ? props.user.role.id : "",
         openPasswordChangeModal: false
      };
   }

   render() {
      const { readOnly } = this.props;
      const errors = this.props.errors ? this.props.errors : [];
      const emailHasError = checkForErrorInInput("email", errors),
         nameHasError = checkForErrorInInput("name", errors),
         roleHasError = checkForErrorInInput("role", errors),
         passwordHasError = checkForErrorInInput("password", errors);

      let email = "",
         passwordInput = null,
         changePasswordButton = null,
         changePasswordModal = null,
         roleSelection = null;

      if (!this.props.user) {
         passwordInput = <ColoredFormField error={passwordHasError}>
            <label>Password</label>
            <Form.Input
               name="password"
               type="password"
               onChange={this._handleChange}
               defaultValue={email}
               readOnly={readOnly} />
         </ColoredFormField>;
      }
      else {
         email = this.props.user.email;

         if (!readOnly) {
            changePasswordButton = <ButtonWithOffset
               content="New password"
               as={"a"}
               onClick={this._onPasswordChangeClick} />;

            changePasswordModal = <PasswordChanger
               user={this.props.user}
               header="Change Password"
               description={`You are going to change the password for the user with email '${email}'.`}
               onCloseClick={this._onCloseClick}
               open={this.state.openPasswordChangeModal} />;
         }
      }

      if (this.props.roles) {
         roleSelection = <ColoredFormField error={roleHasError}>
            <label>Roles</label>
            <RoleSelection fluid selection
               roles={this.props.roles}
               name="roleId"
               defaultValue={this.state.roleId}
               onChange={this._handleChange}
               readOnly={readOnly} />
         </ColoredFormField>;
      }

      return (
         <Form onSubmit={this._onSubmit}>
            <ColoredFormField error={emailHasError}>
               <label>E-Mail</label>
               <Form.Input
                  name="email"
                  onChange={this._handleChange}
                  defaultValue={email}
                  readOnly={readOnly} />
            </ColoredFormField>
            <ColoredFormField error={nameHasError}>
               <label>Name</label>
               <Form.Input
                  name="name"
                  onChange={this._handleChange}
                  defaultValue={this.state.name}
                  readOnly={readOnly} />
            </ColoredFormField>
            {passwordInput}
            {roleSelection}
            <Message error visible hidden={errors.length === 0}>
               <Message.List items={errors.map(error => error.message)} />
            </Message>
            <BasicFlexWrapper direction="row-reverse">
               <ButtonWithOffset primary
                  type="submit"
                  content={this.props.submitButtonTitle}
                  disabled={readOnly} />
               {changePasswordButton}
               {changePasswordModal}
               <Button as={"a"} onClick={browserHistory.goBack} content="Cancel" floated="right" />
            </BasicFlexWrapper>
         </Form>
      );
   };

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      const userData = {
         email: this.state.email,
         name: this.state.name,
         password: this.state.password
      };
      if (this.props.roles) {
         userData.role = this.state.roleId;
      }
      else {
         userData.role = "";
      }

      this.props.onSubmit(userData);
   };

   /**
    * @private
    * @function _onPasswordChangeClick
    * @description change-password-button clicked: opens passwordchange-window.
    */
   _onPasswordChangeClick = () => {
      this.setState({
         openPasswordChangeModal: true,
      });
   };

   /**
    * @private
    * @function _onCloseClick
    * @description Close button in info window has been clicked. Closes the window.
    */
   _onCloseClick = () => {
      this.setState({
         openPasswordChangeModal: false,
      });
   };
};

export default UserForm;