import React from 'react';
import PropTypes from 'prop-types';

import { Message, Form, Button } from 'semantic-ui-react';

import { BasicFlexWrapper } from './../../../assets/styled/Wrapper';
import errorsProps from './../../../helper/errorsProps';
import checkForErrorInInput from './../../../helper/validation';

class SignUpForm extends React.Component {

   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      errors: errorsProps,
      readOnly: PropTypes.bool.isRequired,
   };

   constructor(props) {
      super(props);

      this.state = {
         email: "",
         name: "",
         password: "",
      };
   };

   render() {
      const { readOnly } = this.props;
      const errors = this.props.errors;

      const emailHasError = checkForErrorInInput("email", errors);
      const nameHasError = checkForErrorInInput("name", errors);
      const passwordHasError = checkForErrorInInput("password", errors);

      return (
         <Form onSubmit={this._onSubmit}>
            <Form.Input
               label="E-Mail"
               name="email"
               onChange={this._handleChange}
               error={emailHasError}
               readOnly={readOnly} />
            <Form.Input
               label="Name"
               name="name"
               onChange={this._handleChange}
               error={nameHasError}
               readOnly={readOnly} />
            <Form.Input
               label="Password"
               name="password"
               type="password"
               onChange={this._handleChange}
               error={passwordHasError}
               readOnly={readOnly} />
            <Message error visible hidden={errors.length === 0}>
               <Message.List items={errors.map(error => error.message)} />
            </Message>
            <BasicFlexWrapper direction="row-reverse">
               <Button primary
                  type="submit"
                  content="Create Account"
                  disabled={readOnly} />
            </BasicFlexWrapper>
         </Form>
      );
   }

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
   };
};

export default SignUpForm;