import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Message, Form, Button } from 'semantic-ui-react';

import errorsProps from './../../../helper/errorsProps';
import checkForErrorInInput from './../../../helper/validation';

const ForgotPasswordLink = styled(Link) `
   float: right;
`;

class LoginForm extends React.Component {

   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      errors: errorsProps
   };

   constructor(props) {
      super(props);

      this.state = {
         email: "",
         password: ""
      };
   };

   render() {
      const errors = this.props.errors;

      const emailHasError = checkForErrorInInput("email", errors);
      const passwordHasError = checkForErrorInInput("password", errors);

      return (
         <Form onSubmit={this._onSubmit}>
            <Form.Input
               label="E-Mail"
               name="email"
               onChange={this._handleChange}
               error={emailHasError} />
            <Form.Input
               label={<div>Password<ForgotPasswordLink to="/forgotPassword" tabIndex="-1">Forgot password?</ForgotPasswordLink></div>}
               name="password"
               type="password"
               onChange={this._handleChange}
               error={passwordHasError} />
            <Message error visible hidden={errors.length === 0}>
               <Message.List items={errors.map(error => error.message)} />
            </Message>
            <Form.Field control={Button} primary fluid type="submit" content="Log In" />
         </Form>
      );
   }

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
   };
};

export default LoginForm;