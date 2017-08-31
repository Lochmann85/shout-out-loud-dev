import React from 'react';
import styled from 'styled-components';

import colors from './../../../assets/colors/shout-out-loud-colors.json';
import { TextEllipsisWrapper } from './../../../assets/styled/Wrapper';
import fontSizeCalculation from './../../../helper/fontSizeCalculation';

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

      this.state = {
         fontSize: "0px",
      };
   }

   componentDidUpdate() {
      const currentShout = this.props.shoutsQueue[2];
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

   render() {
      const currentShout = this.props.shoutsQueue[2];

      const CurrentShoutText = styled(TextEllipsisWrapper) `
         font-size:${this.state.fontSize};
         display: flex;
         justify-content:center;
         align-content:center;
         flex-direction:column;
         height:100%;
      `;

      return (
         <ShoutScreenBackground>
            <ShoutScreen
               innerRef={shoutContainer => this.shoutContainer = shoutContainer}
            >
               <CurrentShoutText>
                  {currentShout ? currentShout.message : ""}
               </CurrentShoutText>
            </ShoutScreen>
         </ShoutScreenBackground>
      );
   }
}

export default ShoutsScreen;
