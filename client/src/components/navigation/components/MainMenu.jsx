import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import { Menu, Button } from 'semantic-ui-react';

import ControlCenter from './ControlCenter';
import LoginModal from './../../modal/LoginModal';
import SignupModal from './../../modal/SignupModal';
import colors from './../../../assets/colors/shout-out-loud-colors.json';

import mainMenuFragments from './../graphql/fragments/mainMenu';

const FullHeightMenuMenu = styled(Menu.Menu) `
   height:100%;
   float:right;
   color:${colors.logoLighterBackground}!important;
   @media only screen and (min-width: 768px) {
      margin-left: auto!important;
   };
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

class MainMenu extends React.Component {

   static propTypes = {
      viewer: propType(mainMenuFragments.viewer.document),
      onLoginSuccess: PropTypes.func.isRequired,
      onLogout: PropTypes.func.isRequired,
   };

   constructor(props) {
      super(props);

      this.state = {
         isLoginModalOpen: false,
         isSignupModalOpen: false,
      };
   }

   render() {
      const { viewer, onLogout } = this.props;

      if (viewer) {
         return (
            <FullHeightMenuMenu position="right">
               <ControlCenter viewer={viewer} onLogout={onLogout} />
            </FullHeightMenuMenu>
         );
      }
      else {
         return (
            <FullHeightMenuMenu position="right">
               <FullHeightMenuItem onClick={this._openLoginModal}>Log In</FullHeightMenuItem>
               <SingupButton primary content="Sign Up" onClick={this._openSignupModal} />
               <LoginModal
                  open={this.state.isLoginModalOpen}
                  onCloseClick={this._closeLoginModal}
                  onLoginSuccess={this._handleLoginSuccess} />
               <SignupModal
                  open={this.state.isSignupModalOpen}
                  onCloseClick={this._closeSignupModal} />
            </FullHeightMenuMenu>
         );
      }
   }

   _openLoginModal = () => {
      localStorage.removeItem("jwtToken");
      this.setState({ isLoginModalOpen: true });
   }

   _handleLoginSuccess = (token) => {
      this.setState({ isLoginModalOpen: false }, this.props.onLoginSuccess(token));
   }

   _closeLoginModal = () => this.setState({ isLoginModalOpen: false });


   _openSignupModal = () => this.setState({ isSignupModalOpen: true });

   _closeSignupModal = () => this.setState({ isSignupModalOpen: false });
};

export default MainMenu;