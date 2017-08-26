import React from 'react';
import styled from 'styled-components';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

const ShoutScreenBackground = styled.div`
background-color:${colors.screenBackground};
height:60%;
box-shadow:inset 0 0 15px 3px ${colors.globalBackground};
margin:0 -1rem 6% -1rem;
padding:5rem;
border:1px solid ${colors.logoDarkerBackground};
border-radius:2rem;
`;

const ShoutScreen = styled.div`
background-color:${colors.logoLighterBackground};
height:100%;
width:100%;
box-shadow:0 0 20px 20px ${colors.logoLighterBackground};
border-radius:0.9rem;
`;

const ShoutsScreen = ({ shoutsQueue }) => (
   <ShoutScreenBackground>
      <ShoutScreen>
      </ShoutScreen>
   </ShoutScreenBackground>
);

export default ShoutsScreen;
