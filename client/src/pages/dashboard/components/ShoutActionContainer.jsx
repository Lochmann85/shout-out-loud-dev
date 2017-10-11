import React from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import {
   addResizeObserver,
   removeResizeObserver,
   windowIsAtLeastTablet,
} from './../../../storeHandler/windowSizeStore';
import colors from './../../../assets/colors/shout-out-loud-colors.json';

import shoutActionContainerFragments from './../graphql/fragments/shoutActionContainer';
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

const SHOWN_SHOUTS_MOBILE = 3;
const SHOWN_SHOUTS_COMPUTER = 5;

class ShoutActionContainer extends React.Component {

   static propTypes = {
      shoutsQueueQuery: PropTypes.shape({
         getShoutsQueue: propType(shoutActionContainerFragments.shouts.document)
      })
   }

   constructor(props) {
      super(props);

      this.unsubscribe = null;
      this.state = {
         shownShouts: windowIsAtLeastTablet() ? SHOWN_SHOUTS_MOBILE : SHOWN_SHOUTS_COMPUTER,
      };
   }

   componentDidMount() {
      addResizeObserver(this);
      this.unsubscribe = this.props.shoutsQueueQuery.subscribeToShoutsQueueChanged();
   }

   componentWillUnmount() {
      if (this.unsubscribe) {
         this.unsubscribe();
      }
      removeResizeObserver(this);
   }

   render() {
      const { shoutsQueueQuery: { getShoutsQueue } } = this.props;

      const ShoutsGroup = [];
      for (let index = 0; index < this.state.shownShouts; ++index) {
         const shout = getShoutsQueue[index];
         ShoutsGroup.push(<PastShoutColumn key={index} textAlign="center">
            <ShoutPreview shout={shout} />
         </PastShoutColumn>);
      }

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

   updateOnResize = () => {
      this.setState({
         shownShouts: windowIsAtLeastTablet() ? SHOWN_SHOUTS_MOBILE : SHOWN_SHOUTS_COMPUTER,
      });
   }
};

export default ShoutActionContainer;
