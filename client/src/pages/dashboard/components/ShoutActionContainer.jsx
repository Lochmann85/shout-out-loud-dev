import React from 'react';
import styled from 'styled-components';

import { Grid } from 'semantic-ui-react';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

import ShoutPreview from './ShoutPreview';
import PushShoutForm from './PushShoutForm';

const ShoutActionBackground = styled.div`
   background-color:${colors.logoText};
   -webkit-border-radius:0.7rem;
   border-radius:0.7rem;
   border:1px solid ${colors.logoDarkerBackground};
   height:36%;
   margin: 0 -1rem;
   padding: 1rem 0;
`;

const PastShoutsGrid = styled(Grid) `
   height: calc(100% - 38px);
   border-top:1px solid ${colors.logoDarkerBackground};
   background-color:${colors.screenBackground};
   margin: 1rem 0!important;
   -webkit-border-radius: 0 0 0.65rem 0.65rem;
   border-radius: 0 0 0.65rem 0.65rem;
   padding:0 0.7rem!important;
   -webkit-box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   -moz-box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
`;

const PastShoutColumn = styled(Grid.Column) `
   width:20%!important;
   @media only screen and (max-width:991px) { 
	   width:33%!important;
   };
   padding:0 0.1rem!important;
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
         onlyProp = { only: "computer" };

      const ShoutsGroup = getShoutsQueue.map((shout, index) => {
         let additionalProp = null;
         if (index === 0 || index === length - 1) {
            additionalProp = onlyProp;
         }

         return <PastShoutColumn key={index} {...additionalProp} className="computer large-screen widescreen" textAlign="center">
            <ShoutPreview shout={shout} />
         </PastShoutColumn>;
      });

      return (
         <ShoutActionBackground>
            <Grid>
               <Grid.Row>
                  <Grid.Column>
                     <PushShoutForm />
                  </Grid.Column>
               </Grid.Row>
            </Grid>
            <PastShoutsGrid>
               <Grid.Row centered>
                  {ShoutsGroup}
               </Grid.Row>
            </PastShoutsGrid>
         </ShoutActionBackground>
      );
   }
};

export default ShoutActionContainer;
