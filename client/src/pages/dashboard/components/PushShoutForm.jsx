import React from 'react';
import styled from 'styled-components';

import { Form, Input, Button } from 'semantic-ui-react';

import { BasicFlexWrapper } from './../../../assets/styled/Wrapper';
import colors from './../../../assets/colors/shout-out-loud-colors.json';

import pushShoutMutation from './../graphql/mutations/pushShoutMutation';

import {
   ShoutChecker
} from './../../../authorization';

const shout = new ShoutChecker();

const FlexRoot = styled(BasicFlexWrapper) `
   -ms-flex-wrap: wrap;
   flex-wrap: wrap;
   -ms-flex-align: stretch;
   align-items: stretch;
   @media only screen and (max-width: 399px) {
      display: none;
   };
`;

const SmallestDeviceInput = styled(Form.Input) `
   margin-left: 1rem!important;
   margin-right: 1rem!important;
   @media only screen and (min-width: 400px) {
      display: none;
   };
`;

const FlexRowStd = styled(BasicFlexWrapper) `
   position: relative;
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
   };
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
      const { viewer } = this.props;

      let enabled = false;
      if (viewer) {
         enabled = shout.check({}, viewer);
      }

      return (
         <Form onSubmit={this._onSubmit}>
            <FlexRoot>
               <FlexRowStd>
                  <ThoughtLabel>Your thought</ThoughtLabel>
                  <ShoutInputColumn>
                     <Form.Field>
                        <Input
                           name="message"
                           onChange={this._onInputChange}
                           readOnly={!enabled}
                        />
                     </Form.Field>
                  </ShoutInputColumn>
                  <ButtonColumn>
                     <Form.Field>
                        <Button
                           primary
                           type="submit"
                           content="Shout!"
                           disabled={!enabled}
                        />
                     </Form.Field>
                  </ButtonColumn>
               </FlexRowStd>
            </FlexRoot>
            <SmallestDeviceInput
               name="message"
               onChange={this._onInputChange}
               readOnly={!enabled}
               action={<Button primary type="submit" content="Shout!" disabled={!enabled} />} />
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
