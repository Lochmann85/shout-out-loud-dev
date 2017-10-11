import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Form, Modal, Button, Message } from 'semantic-ui-react';

import passwordChangerFragments from './../graphql/fragments/passwordChanger';
import changeUserPasswordMutation from './../graphql/mutations/changeUserPassword';
import mutationErrorHandling from './../../../components/errorHandling/mutationErrorHandling';
import checkForErrorInInput from './../../../helper/validation';

const StyledDescription = styled(Modal.Description) `
   margin-bottom: 1rem!important;
`;

class PasswordChanger extends React.Component {

   static propTypes = {
      user: propType(passwordChangerFragments.user.document),
      header: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      onCloseClick: PropTypes.func.isRequired,
   };

   constructor(props) {
      super(props);
      this.state = {
         showSuccessionBox: false,
         password: "",
         new: "",
         confirm: "",
         errors: []
      };
   }

   render() {
      const { header, description, user, onCloseClick, changeUserPassword, ...others } = this.props; // eslint-disable-line no-unused-vars

      const passwordHasError = checkForErrorInInput("password", this.state.errors);
      const newHasError = checkForErrorInInput("new", this.state.errors);
      const confirmHasError = checkForErrorInInput("confirm", this.state.errors);

      let successionBox = (this.state.showSuccessionBox && this.state.errors.length <= 0) ? <Message
         success
         visible={true}
         content="Password changed!" /> : null;
      let errorBox = (this.state.errors.length > 0) ? <Message
         error
         visible={true}
         list={this.state.errors.map(error => error.message)} /> : null;

      return (
         <Modal {...others} size="small">
            <Modal.Header content={header} />
            <Modal.Content>
               <StyledDescription>
                  {description}
               </StyledDescription>
               <Form>
                  <Form.Input name="password"
                     label="Old password"
                     placeholder="Old password..."
                     type="password"
                     onChange={this._handleChange}
                     error={passwordHasError} />
                  <Form.Input name="new"
                     label="New password"
                     placeholder="New password..."
                     type="password"
                     onChange={this._handleChange}
                     error={newHasError} />
                  <Form.Input
                     label="Confirm password"
                     name="confirm"
                     placeholder="Confirm password..."
                     type="password"
                     onChange={this._handleChange}
                     error={confirmHasError} />
               </Form >
               {successionBox}
               {errorBox}
            </Modal.Content>
            <Modal.Actions>
               <Button content="Close"
                  onClick={this._onClose} />
               <Button primary
                  content="Confirm"
                  type="submit"
                  onClick={this._onSubmit} />
            </Modal.Actions>
         </Modal>
      );
   }

   _handleChange = (e, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      const passwordChangeData = {
         password: this.state.password,
         new: this.state.new,
         confirm: this.state.confirm,
      };
      this.props.changeUserPassword(passwordChangeData, this.props.user.id)
         .then(response => {
            this.setState({
               showSuccessionBox: true,
               errors: []
            });
         })
         .catch(error => mutationErrorHandling(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({ errors });

   _onClose = () => {
      this.setState({
         errors: [],
         showSuccessionBox: false
      });
      this.props.onCloseClick();
   };
};

export default changeUserPasswordMutation(PasswordChanger);
