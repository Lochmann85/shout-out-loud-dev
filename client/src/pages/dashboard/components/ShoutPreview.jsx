import React from 'react';
import styled from 'styled-components';

import colors from './../../../assets/colors/shout-out-loud-colors.json';
import { VerticalAlignTextWrapper } from './../../../assets/styled/Wrapper';
import fontSizeCalculation from './../../../helper/fontSizeCalculation';

const Background = styled.div`
   width:100%;
   height:100%;
   padding:2%;
`;

const ShoutMessage = styled.div`
   background-color:${colors.logoLighterBackground};
   color:${colors.logoText};
   text-align:left;
   height:66%;
   -webkit-border-radius:0.6rem;
   border-radius:0.6rem;
   padding:10px;
`;

const ShoutOfUser = styled.div`
   color:${colors.logoLighterBackground};
   text-align:left;
   height:33%;
   padding:2% 0;
`;

class ShoutPreview extends React.Component {

   constructor(props) {
      super(props);

      this.resized = false;

      this.state = {
         fontSize: "0px",
      };
   }

   _updateFontSize() {
      let shoutFontSize;
      if (this.props.shout) {
         shoutFontSize = fontSizeCalculation.calculate(this.shoutContainer, "10", this.props.shout.message);
      }
      shoutFontSize = `${shoutFontSize}px`;

      if (this.state.fontSize !== shoutFontSize && !this.resized) {
         this.resized = true;
         this.setState({ fontSize: shoutFontSize }, () => { this.resized = false; });
      }
   }

   componentDidMount() {
      this._updateFontSize();
   }

   componentDidUpdate() {
      this._updateFontSize();
   }

   render() {
      const { shout } = this.props;

      return (
         <Background>
            <ShoutMessage
               innerRef={shoutContainer => this.shoutContainer = shoutContainer}
            >
               <VerticalAlignTextWrapper fontSize={this.state.fontSize}>
                  {shout ? shout.message : ""}
               </VerticalAlignTextWrapper>
            </ShoutMessage>
            <ShoutOfUser>
               User
            </ShoutOfUser>
         </Background>
      );
   }
};

export default ShoutPreview;
