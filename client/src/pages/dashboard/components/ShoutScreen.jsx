import React from 'react';
import styled from 'styled-components';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

const ShoutScreenBackground = styled.div`
   background-color:${colors.screenBackground};
   height:62%;
   -webkit-box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   -moz-box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   margin:0 -1rem 3% -1rem;
   padding:4rem;
   @media only screen and (max-width:767px) { 
	   padding:3rem;
   };
   border:1px solid ${colors.logoDarkerBackground};
   -webkit-border-radius:2rem;
   border-radius:2rem;
`;

const ShoutScreen = styled.div`
   background-color:${colors.logoLighterBackground};
   height:100%;
   width:100%;
   -webkit-box-shadow: 0 0 20px 20px ${colors.logoLighterBackground};
   -moz-box-shadow: 0 0 20px 20px ${colors.logoLighterBackground};
   box-shadow:0 0 20px 20px ${colors.logoLighterBackground};
   -webkit-border-radius:0.9rem;
   border-radius:0.9rem;
`;

const ShoutsScreen = ({ shoutsQueue }) => (
   <ShoutScreenBackground>
      <ShoutScreen>
      </ShoutScreen>
   </ShoutScreenBackground>
);

export default ShoutsScreen;
