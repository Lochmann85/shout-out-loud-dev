import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Message, Form, Button } from 'semantic-ui-react';

import { BasicFlexWrapper } from './../../../assets/styled/Wrapper';
import errorsProps from './../../../helper/errorsProps';
import checkForErrorInInput from './../../../helper/validation';

const ButtonWithOffset = styled(Button) `
   margin-left: 0.75rem!important;
`;

class ForgotPasswordForm extends React.Component {

   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      errors: errorsProps,
      onChangeToLogin: PropTypes.func.isRequired,
      forgotPasswordSuccess: PropTypes.bool.isRequired,
   };

   constructor(props) {
      super(props);

      this.state = {
         email: "",
      };
   };

   render() {
      const { forgotPasswordSuccess } = this.props;
      const errors = this.props.errors;

      const emailHasError = checkForErrorInInput("email", errors);

      return (
         <Form onSubmit={this._onSubmit}>
            <Form.Input
               label="E-Mail"
               name="email"
               onChange={this._handleChange}
               error={emailHasError}
               readOnly={forgotPasswordSuccess} />
            <Message error visible hidden={errors.length === 0}>
               <Message.List items={errors.map(error => error.message)} />
            </Message>
            <BasicFlexWrapper direction="row-reverse">
               <ButtonWithOffset primary
                  type="submit"
                  content="Request E-Mail"
                  disabled={forgotPasswordSuccess} />
               <Button as={"a"} onClick={this._handleCancelClick} content="Cancel" />
            </BasicFlexWrapper>
            <Message positive visible hidden={!forgotPasswordSuccess} content="Please follow the instructions on the E-Mail to reset your password." />
         </Form>
      );
   }

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _handleCancelClick = (event) => {
      event.preventDefault();
      this.props.onChangeToLogin();
   }

   _onSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state.email);
   };
};

export default ForgotPasswordForm;