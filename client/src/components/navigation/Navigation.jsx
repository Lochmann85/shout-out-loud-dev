import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Grid, Menu, Image } from 'semantic-ui-react';

import logo from './../../assets/images/shout-out-loud-logo.svg';
import colors from './../../assets/colors/shout-out-loud-colors.json';

import ControlCenter from './components/ControlCenter';

import navigationFragments from './navigationFragments';

const NavigationWrapper = styled.div`
   background-color:${colors.logoText};
   border-bottom:1px solid ${colors.logoDarkerBackground};
`;

const HeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${colors.logoLighterBackground};
   vertical-align:middle;
   @media only screen and (max-width: 767px) {
      display: none;
   };
`;

const MobileHeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${colors.logoLighterBackground};
   vertical-align:middle;
   @media only screen and (min-width: 768px) {
      display: none;
   };
`;

const LogoImage = styled(Image) `
   @media only screen and (max-width: 767px) {
      height:32px;
      width:32px;
   };
   display:inline-block!important;
`;

const FullHeightMenuMenu = styled(Menu.Menu) `
   height:100%;
   float:right;
   color:${colors.logoLighterBackground}!important;
`;

const Navigation = ({ viewer }) => {
   return (
      <NavigationWrapper>
         <Menu secondary>
            <Grid container>
               <Grid.Row>
                  <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} widescreen={2} />
                  <Grid.Column mobile={10} tablet={11} computer={12} largeScreen={10} widescreen={10}>
                     <Menu.Item header >
                        <Link to="/">
                           <LogoImage src={logo} />
                           <HeaderText>Shout Out Loud</HeaderText>
                           <MobileHeaderText>S-O-L</MobileHeaderText>
                        </Link>
                     </Menu.Item>
                  </Grid.Column>
                  <Grid.Column mobile={6} tablet={3} computer={2} largeScreen={2} widescreen={2}>
                     <FullHeightMenuMenu position="right">
                        <ControlCenter viewer={viewer} />
                     </FullHeightMenuMenu>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Menu>
      </NavigationWrapper>
   );
};

Navigation.propTypes = {
   viewer: propType(navigationFragments.viewer.document)
};

Navigation.fragments = {
   viewer: navigationFragments.viewer
};

export default Navigation;
