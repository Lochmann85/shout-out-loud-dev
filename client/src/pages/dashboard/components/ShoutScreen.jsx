import React from 'react';
import styled from 'styled-components';

import colors from './../../../assets/colors/shout-out-loud-colors.json';
import { VerticalAlignTextWrapper } from './../../../assets/styled/Wrapper';
import fontSizeCalculation from './../../../helper/fontSizeCalculation';

import BaseLayoutLoader from './../../../components/layout/BaseLayoutLoader';
import currentShoutQuery from './../graphql/queries/currentShoutQuery';

const ShoutScreenBackground = styled.div`
   background-color:${colors.screenBackground};
   height:62%;
   -webkit-box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   -moz-box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   margin:0 -1rem 3% -1rem;
   padding:60px;
   @media only screen and (max-width:767px) { 
	   padding:50px;
   };
   border:1px solid ${colors.logoDarkerBackground};
   -webkit-border-radius:2rem;
   border-radius:2rem;
`;

const ShoutScreen = styled.div`
   background-color:${colors.logoLighterBackground};
   color:${colors.logoText};
   height:100%;
   width:100%;
   -webkit-box-shadow: 0 0 20px 20px ${colors.logoLighterBackground};
   -moz-box-shadow: 0 0 20px 20px ${colors.logoLighterBackground};
   box-shadow:0 0 20px 20px ${colors.logoLighterBackground};
   -webkit-border-radius:0.9rem;
   border-radius:0.9rem;
`;

class ShoutsScreen extends React.Component {

   constructor(props) {
      super(props);

      this.resized = false;
      this.unsubscribe = null;

      this.state = {
         fontSize: "0px",
      };
   }

   _updateFontSize() {
      const currentShout = this.props.currentShoutQuery.getCurrentShout;

      let shoutFontSize;
      if (currentShout) {
         shoutFontSize = fontSizeCalculation.calculate(this.shoutContainer, "60", currentShout.message);
      }
      shoutFontSize = `${shoutFontSize}px`;

      if (this.state.fontSize !== shoutFontSize && !this.resized) {
         this.resized = true;
         this.setState({ fontSize: shoutFontSize }, () => { this.resized = false; });
      }
   }

   componentDidMount() {
      this.unsubscribe = this.props.currentShoutQuery.subscribeToCurrentShoutChanged();
      this._updateFontSize();
   }

   componentWillUnmount() {
      if (this.unsubscribe) {
         this.unsubscribe();
      }
   }

   componentDidUpdate() {
      this._updateFontSize();
   }

   render() {
      const { currentShoutQuery } = this.props;

      if (currentShoutQuery.loading) {
         return <BaseLayoutLoader />;
      }
      else if (currentShoutQuery.error) {
         console.log(currentShoutQuery.error);
         return <BaseLayoutLoader />;
      }

      const currentShout = currentShoutQuery.getCurrentShout;

      return (
         <ShoutScreenBackground>
            <ShoutScreen
               innerRef={shoutContainer => this.shoutContainer = shoutContainer}
            >
               <VerticalAlignTextWrapper fontSize={this.state.fontSize}>
                  {currentShout ? currentShout.message : ""}
               </VerticalAlignTextWrapper>
            </ShoutScreen>
         </ShoutScreenBackground>
      );
   }
}

export default currentShoutQuery(ShoutsScreen);
