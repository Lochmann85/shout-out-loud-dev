import React from 'react';
import styled from 'styled-components';

import { Grid, Form, Input, Button } from 'semantic-ui-react';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

import pushShoutMutation from './../graphql/mutations/pushShoutMutation';

const ThoughtLabel = styled.label`
   color:${colors.logoLighterBackground}
`;

class PushShoutForm extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         message: ""
      };
   }

   render() {
      return (
         <Form onSubmit={this._onSubmit}>
            <Grid>
               <Grid.Row>
                  <Grid.Column tablet={3} textAlign="right" verticalAlign="middle">
                     <ThoughtLabel>Your thought</ThoughtLabel>
                  </Grid.Column>
                  <Grid.Column tablet={10}>
                     <Form.Field>
                        <Input name="message" onChange={this._onInputChange} />
                     </Form.Field>
                  </Grid.Column>
                  <Grid.Column tablet={3}>
                     <Form.Field>
                        <Button primary type="submit" content="Shout!" />
                     </Form.Field>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Form>
      );
   }

   _onInputChange = (event, { name, value }) => this.setState({ [name]: value });

   _onSubmit = (event) => {
      event.preventDefault();

      this.props.pushShout(this.state).catch(error => console.log(error));
   }
};

export default pushShoutMutation(PushShoutForm);
