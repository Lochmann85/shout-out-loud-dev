import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Grid, Menu, Image, Button } from 'semantic-ui-react';

import logo from './../../assets/images/shout-out-loud-logo.svg';
import colors from './../../assets/colors/shout-out-loud-colors.json';

import ControlCenter from './components/ControlCenter';
import LoginModal from './../modal/LoginModal';

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

const FullHeightMenuItem = styled(Menu.Item) `
   height:100%;
   color:${colors.logoLighterBackground}!important;
`;

const SingupButton = styled(Button) `
   margin: 0.75rem 0!important;
   @media only screen and (max-width: 767px) {
      margin: 0.5rem 0!important;
   };
`;

class Navigation extends React.Component {

   static propTypes = {
      viewer: propType(navigationFragments.viewer.document),
      currentPathState: PropTypes.object,
      onLoginSuccess: PropTypes.func.isRequired,
      onLogout: PropTypes.func.isRequired,
   };

   static fragments = {
      viewer: navigationFragments.viewer
   };

   constructor(props) {
      super(props);

      this.state = {
         isLoginModalOpen: false
      };
   }

   componentDidMount() {
      this._handleLoginSuccess = this._handleLoginSuccess.bind(this);
   }

   componentWillReceiveProps(nextProp) {
      if (nextProp.currentPathState && nextProp.currentPathState.isLoginModalOpen) {
         this.setState({ isLoginModalOpen: nextProp.currentPathState.isLoginModalOpen });
      }
   }

   render() {
      const { viewer, onLogout } = this.props;

      let controlMenuItem;
      if (viewer) {
         controlMenuItem = <FullHeightMenuMenu position="right">
            <ControlCenter viewer={viewer} onLogout={onLogout} />
         </FullHeightMenuMenu>;
      }
      else {
         controlMenuItem = <FullHeightMenuMenu position="right">
            <FullHeightMenuItem onClick={this._openLoginModal}>Log In</FullHeightMenuItem>
            <SingupButton primary content="Sign Up" onClick={this._openSignUpModal} />
            <LoginModal
               open={this.state.isLoginModalOpen}
               onCloseClick={this._closeLoginModal}
               onLoginSuccess={this._handleLoginSuccess} />
         </FullHeightMenuMenu>;
      }

      return (
         <NavigationWrapper>
            <Menu secondary>
               <Grid container>
                  <Grid.Row>
                     <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} widescreen={2} />
                     <Grid.Column mobile={10} tablet={9} computer={10} largeScreen={8} widescreen={8}>
                        <Menu.Item header >
                           <Link to="/">
                              <LogoImage src={logo} />
                              <HeaderText>Shout Out Loud</HeaderText>
                              <MobileHeaderText>S-O-L</MobileHeaderText>
                           </Link>
                        </Menu.Item>
                     </Grid.Column>
                     <Grid.Column mobile={6} tablet={5} computer={4} largeScreen={4} widescreen={4}>
                        {controlMenuItem}
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
            </Menu>
         </NavigationWrapper>
      );
   }

   _openLoginModal = () => {
      localStorage.removeItem("jwtToken");
      this.setState({ isLoginModalOpen: true });
   }

   _handleLoginSuccess = function (token) {
      this.setState({ isLoginModalOpen: false }, this.props.onLoginSuccess(token));
   }

   _closeLoginModal = () => this.setState({ isLoginModalOpen: false });

   _openSignupModal = () => this.setState({ isSignupModalOpen: true });

   _closeSignupModal = () => this.setState({ isSignupModalOpen: false });
};

export default Navigation;
