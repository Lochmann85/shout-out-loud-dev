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
   @media only screen and (max-width:460px) { 
      margin-left: 0!important;
      margin-right: 0!important;
      -webkit-flex: 1 1 auto!important;
      -ms-flex: 1 1 auto!important;
      flex: 1 1 auto!important;
   };
`;

const ButtonWrapperPc = styled(BasicFlexWrapper) `
   @media only screen and (max-width:460px) { 
      display: none!important;
   };
`;

const ButtonWrapperMobile = styled(BasicFlexWrapper) `
@media only screen and (min-width:461px) { 
   display: none!important;
};
`;

const NewPasswordButton = styled(ButtonWithOffset) `
   @media only screen and (max-width:460px) {
      margin-bottom: 2rem!important;
   };
`;

const CancelButton = styled(ButtonWithOffset) `
   @media only screen and (max-width:460px) { 
      margin-right: 1rem!important;
   };
`;

class UserForm extends React.Component {

   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      user: propType(userFormFragments.user.document),
      roles: PropTypes.arrayOf(propType(userFormFragments.roles.document)),
      submitButtonTitle: PropTypes.string.isRequired,
      readOnly: PropTypes.bool.isRequired,
      isEMailReadOnly: PropTypes.bool.isRequired,
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
      const { readOnly, user, roles, isEMailReadOnly } = this.props;
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

      if (!user) {
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
         email = user.email;

         if (!readOnly) {
            changePasswordButton = <NewPasswordButton
               content="New password"
               as={"a"}
               onClick={this._onPasswordChangeClick} />;

            changePasswordModal = <PasswordChanger
               user={user}
               header="Change Password"
               description={`You are going to change the password for the user with email '${email}'.`}
               onCloseClick={this._onCloseClick}
               open={this.state.openPasswordChangeModal} />;
         }
      }

      if (roles) {
         roleSelection = <ColoredFormField error={roleHasError}>
            <label>Roles</label>
            <RoleSelection fluid selection
               roles={roles}
               name="roleId"
               defaultValue={this.state.roleId}
               onChange={this._handleChange}
               readOnly={readOnly} />
         </ColoredFormField>;
      }

      const submitButton = <ButtonWithOffset primary type="submit" content={this.props.submitButtonTitle} disabled={readOnly} />,
         cancelButton = <CancelButton as={"a"} onClick={browserHistory.goBack} content="Cancel" />;

      return (
         <Form onSubmit={this._onSubmit}>
            <ColoredFormField error={emailHasError}>
               <label>E-Mail</label>
               <Form.Input
                  name="email"
                  onChange={this._handleChange}
                  defaultValue={email}
                  readOnly={readOnly || isEMailReadOnly} />
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
            <ButtonWrapperPc direction="row-reverse">
               {submitButton}
               {changePasswordButton}
               {cancelButton}
            </ButtonWrapperPc>
            <ButtonWrapperMobile direction="column">
               {changePasswordButton}
               <BasicFlexWrapper direction="row">
                  {cancelButton}
                  {submitButton}
               </BasicFlexWrapper>
            </ButtonWrapperMobile>
            {changePasswordModal}
         </Form>
      );
   };

   _onSubmit = (event) => {
      event.preventDefault();

      const userData = {
         name: this.state.name,
         password: this.state.password
      };

      if (!this.props.isEMailReadOnly) {
         userData.email = this.state.email;
      }
      if (this.props.roles) {
         if (this.props.user && this.props.user.role.id !== this.state.roleId) {
            userData.role = this.state.roleId;
         }
         else {
            userData.role = this.state.roleId;
         }
      }

      this.props.onSubmit(userData);
   };

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onPasswordChangeClick = () => this.setState({ openPasswordChangeModal: true });

   _onCloseClick = () => this.setState({ openPasswordChangeModal: false });
};

export default UserForm;