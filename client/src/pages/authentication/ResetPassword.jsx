import React from 'react';

import { Form, Message, Button } from 'semantic-ui-react';

import {
   SegmentBackground,
   ColoredFormField
} from './../../assets/styled/UI';
import {
   TopOffsetWrapper,
   BasicFlexWrapper,
} from './../../assets/styled/Wrapper';

import BaseContentLayout from './../../components/layout/BaseContentLayout';
import apolloClient from './../../storeHandler/apolloClient';
import resetPasswordMutation from './graphql/mutations/resetPassword';
import mutationErrorHandling from './../../components/errorHandling/mutationErrorHandling';
import checkForErrorInInput from './../../helper/validation';

class ResetPassword extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         new: "",
         confirm: "",
         errors: [],
         showConfirmMessage: false,
      };
   };

   componentWillMount() {
      localStorage.removeItem("jwtToken");
      apolloClient.resetStore();
   };

   render() {
      const errors = this.state.errors;

      const newHasError = checkForErrorInInput("new", errors);
      const confirmHasError = checkForErrorInInput("confirm", errors);

      return (
         <TopOffsetWrapper>
            <BaseContentLayout title={"Reset your password"}>
               <SegmentBackground>
                  <Form onSubmit={this._onSubmit}>
                     <ColoredFormField error={newHasError}>
                        <label>New</label>
                        <Form.Input
                           name="new"
                           type="password"
                           onChange={this._handleChange} />
                     </ColoredFormField>
                     <ColoredFormField error={confirmHasError}>
                        <label>Confirm</label>
                        <Form.Input
                           name="confirm"
                           type="password"
                           onChange={this._handleChange} />
                     </ColoredFormField>
                     <Message error visible hidden={errors.length === 0}>
                        <Message.List items={errors.map(error => error.message)} />
                     </Message>
                     <BasicFlexWrapper direction="row-reverse">
                        <Button primary
                           type="submit"
                           content="Reset" />
                     </BasicFlexWrapper>
                     <Message positive visible
                        hidden={!this.state.showConfirmMessage}
                        content="The Password has been changed." />
                  </Form>
               </SegmentBackground>
            </BaseContentLayout>
         </TopOffsetWrapper>
      );
   }

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      const resetPwdToken = this.props.match.params.token;
      this.props.resetPassword(this.state.new, this.state.confirm, resetPwdToken).then(() => {
         this.setState({
            errors: [],
            showConfirmMessage: true,
         });
      }).catch(error => mutationErrorHandling(error, this._onShowError));
   };

   _onShowError = (errors) => this.setState({
      showConfirmMessage: false,
      errors,
   });
};

export default resetPasswordMutation(ResetPassword);