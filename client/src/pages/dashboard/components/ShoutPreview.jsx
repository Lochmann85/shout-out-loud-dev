import React from 'react';
import styled from 'styled-components';

import colors from './../../../assets/colors/shout-out-loud-colors.json';
import { TextEllipsisWrapper } from './../../../assets/styled/Wrapper';

const Background = styled.div`
   width:100%;
   height:100%;
   padding:2%;
`;

const ShoutMessage = styled(TextEllipsisWrapper) `
   background-color:${colors.logoLighterBackground};
   color:${colors.logoText};
   text-align:left;
   height:66%;
   -webkit-border-radius:0.6rem;
   border-radius:0.6rem
`;

const ShoutOfUser = styled(TextEllipsisWrapper) `
   color:${colors.logoLighterBackground};
   text-align:left;
   height:33%;
   padding:2% 0;
`;

class SoutPreview extends React.Component {

   render() {
      const { shout } = this.props;

      return (
         <Background>
            <ShoutMessage>
               {shout ? shout.message : null}
            </ShoutMessage>
            <ShoutOfUser>
               User
               </ShoutOfUser>
         </Background>
      );
   }
};

export default SoutPreview;
