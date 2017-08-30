import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Grid, Menu, Image } from 'semantic-ui-react';

import logo from './../../assets/images/shout-out-loud-logo.svg';
import colors from './../../assets/colors/shout-out-loud-colors.json';

const NavigationWrapper = styled.div`
   background-color:${colors.logoText};
   border-bottom:1px solid ${colors.logoDarkerBackground};
`;

const HeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${colors.logoLighterBackground};
   vertical-align:middle;
`;

const LogoImage = styled(Image) `
   display:inline-block!important;
`;

const FullHeightMenuItem = styled(Menu.Item) `
   height:100%;
   float:right;
   color:${colors.logoLighterBackground}!important;
`;

const Navigation = () => (
   <NavigationWrapper>
      <Menu secondary>
         <Grid container>
            <Grid.Row>
               <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} />
               <Grid.Column mobile={12} tablet={11} computer={12} largeScreen={10}>
                  <Menu.Item header >
                     <Link to="/">
                        <LogoImage src={logo} />
                        <HeaderText>Shout Out Loud</HeaderText>
                     </Link>
                  </Menu.Item>
               </Grid.Column>
               <Grid.Column mobile={4} tablet={3} computer={2} largeScreen={2}>
                  <FullHeightMenuItem content="Youre on!" position="right" />
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </Menu>
   </NavigationWrapper>
);

export default Navigation;
