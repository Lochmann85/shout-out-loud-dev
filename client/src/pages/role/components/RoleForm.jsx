import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Form, Message, Button, Dropdown } from 'semantic-ui-react';

import { ColoredFormField } from './../../../assets/styled/UI';
import { BasicFlexWrapper } from './../../../assets/styled/Wrapper';

import browserHistory from './../../../storeHandler/routerHistory';
import errorsProps from './../../../helper/errorsProps';
import checkForErrorInInput from './../../../helper/validation';

import roleFormFragments from './../graphql/fragments/roleForm';

const ButtonWithOffset = styled(Button) `
   margin-left: 0.75rem!important;
`;

class RoleForm extends React.Component {

   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      role: propType(roleFormFragments.role.document),
      rules: PropTypes.arrayOf(propType(roleFormFragments.rules.document)),
      submitButtonTitle: PropTypes.string.isRequired,
      readOnly: PropTypes.bool.isRequired,
      errors: errorsProps,
   }

   constructor(props) {
      super(props);
      this.state = {
         name: props.role ? props.role.name : "",
         ruleIds: props.role ? props.role.rules.map(item => item.id) : [],
      };
   }

   render() {
      const { readOnly, rules } = this.props;
      const errors = this.props.errors ? this.props.errors : [];
      const nameHasError = checkForErrorInInput("name", errors);

      let options = [];
      if (rules) {
         options = rules.map(rule => {
            return {
               key: rule.id,
               value: rule.id,
               text: rule.name,
            };
         });
      }

      return (
         <Form onSubmit={this._onSubmit}>
            <ColoredFormField error={nameHasError}>
               <label>Name</label>
               <Form.Input
                  name="name"
                  onChange={this._handleChange}
                  defaultValue={this.state.name}
                  readOnly={readOnly} />
            </ColoredFormField>
            <ColoredFormField>
               <label>Rules</label>
               <Dropdown
                  search fluid selection multiple
                  name="ruleIds"
                  options={options}
                  defaultValue={this.state.ruleIds}
                  disabled={readOnly}
                  onChange={this._handleChange} />
            </ColoredFormField>
            <Message error visible hidden={errors.length === 0}>
               <Message.List items={errors.map(error => error.message)} />
            </Message>
            <BasicFlexWrapper direction="row-reverse">
               <ButtonWithOffset primary
                  type="submit"
                  content={this.props.submitButtonTitle}
                  disabled={readOnly} />
               <Button as={"a"} onClick={browserHistory.goBack} content="Cancel" />
            </BasicFlexWrapper>
         </Form>
      );
   };

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      const roleData = {
         name: this.state.name,
         rules: this.state.ruleIds,
      };
      this.props.onSubmit(roleData);
   };

};

export default RoleForm;