import React from 'react';
import styled from 'styled-components';

import { Grid } from 'semantic-ui-react';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

import ShoutPreview from './ShoutPreview';
import PushShoutForm from './PushShoutForm';

const ShoutActionBackground = styled(Grid) `
background-color:${colors.logoText};
-webkit-border-radius:0.7rem;
border-radius:0.7rem;
border:1px solid ${colors.logoDarkerBackground};
height:33%;
margin: 0 -1rem!important;
`;

class ShoutActionContainer extends React.Component {

   constructor(props) {
      super(props);

      this.unsubscribe = null;
   }

   componentWillMount() {
      this.unsubscribe = this.props.shoutsQueueQuery.subscribeToShoutsQueueChanged();
   }

   componentWillUnmount() {
      if (this.unsubscribe) {
         this.unsubscribe();
      }
   }

   render() {
      const { shoutsQueueQuery: { getShoutsQueue } } = this.props,
         length = getShoutsQueue.length,
         onlyProp = { only: "tablet" };

      const ShoutsGroup = getShoutsQueue.map((shout, index) => {
         let additionalProp = null;
         if (index === 0 || index === length - 1) {
            additionalProp = onlyProp;
         }

         return <Grid.Column key={index} {...additionalProp} tablet={3} computer={3} largeScreen={3} textAlign="center">
            <ShoutPreview shout={shout} />
         </Grid.Column>;
      });

      return (
         <ShoutActionBackground>
            <Grid.Row>
               {ShoutsGroup}
            </Grid.Row>
            <Grid.Row>
               <Grid.Column>
                  <PushShoutForm />
               </Grid.Column>
            </Grid.Row>
         </ShoutActionBackground>
      );
   }
};

export default ShoutActionContainer;