import React from 'react';
import styled from 'styled-components';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

const Background = styled.div`
   width:100%;
   background-color:${colors.logoDarkerBackground};
   color:${colors.logoLighterBackground};
   border: 1px solid ${colors.logoLighterBackground};
   -webkit-border-radius:0.28571429rem;
   border-radius:0.28571429rem;
   padding:0.5rem;
   height:50px;
`;

class SoutPreview extends React.Component {

   render() {
      const { shout } = this.props;

      if (shout) {
         return (
            <Background>
               {shout.message}
            </Background>
         );
      }
      else {
         return (
            <Background />
         );
      }

   }
};

export default SoutPreview;
