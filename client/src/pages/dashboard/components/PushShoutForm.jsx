import React from 'react';
import styled from 'styled-components';

import { Form, Input, Button } from 'semantic-ui-react';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

import pushShoutMutation from './../graphql/mutations/pushShoutMutation';

const FlexRoot = styled.div`
   display: -ms-flexbox;
   display: flex;
   -ms-flex-direction: row;
   flex-direction: row;
   -ms-flex-wrap: wrap;
   flex-wrap: wrap;
   -ms-flex-align: stretch;
   align-items: stretch;
`;

const FlexRowStd = styled.div`
   position: relative;
   display: -ms-flexbox;
   display: flex;
   -ms-flex-direction: row;
   flex-direction: row;
   -ms-flex-wrap: wrap;
   flex-wrap: wrap;
   -ms-flex-pack: inherit;
   justify-content: inherit;
   -ms-flex-align: stretch;
   align-items: stretch;
   width: 100%;
`;

const ThoughtLabel = styled.label`
   color:${colors.logoLighterBackground};
   font-weight: bold;
   text-align: right;
   -ms-flex-direction: column;
    flex-direction: column;
    vertical-align: middle;
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
    margin-left: 1rem;
    flex:0 0 auto;
    @media only screen and (max-width: 767px) {
      display: none;
   }
`;

const ShoutInputColumn = styled.div`
   position: relative;
   display: inline-block;
   padding-left: 1rem;
   padding-right: 1rem;
   vertical-align: top;
   -ms-flex-align: stretch;
   align-items: stretch;
   flex:1 1 auto;
`;

const ButtonColumn = styled.div`
   position: relative;
   display: inline-block;
   vertical-align: top;
   flex:0 0 auto;
   margin-right: 1rem;
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
            <FlexRoot>
               <FlexRowStd>
                  <ThoughtLabel>Your thought</ThoughtLabel>
                  <ShoutInputColumn>
                     <Form.Field>
                        <Input name="message" onChange={this._onInputChange} />
                     </Form.Field>
                  </ShoutInputColumn>
                  <ButtonColumn>
                     <Form.Field>
                        <Button primary type="submit" content="Shout!" />
                     </Form.Field>
                  </ButtonColumn>
               </FlexRowStd>
            </FlexRoot>
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
