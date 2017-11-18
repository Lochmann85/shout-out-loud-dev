import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

import ViewerInfo from './ViewerInfo';

import controlCenterFragments from './../graphql/fragments/controlCenter';

import {
   ReadUserChecker,
   ReadRoleChecker,
} from './../../../authorization';

const readUser = new ReadUserChecker();
const readRole = new ReadRoleChecker();

const FullHeightDrowdown = styled(Dropdown) `
   height: 100%;
   > .icon {
      margin: 0!important;
      color: ${colors.logoLighterBackground}!important;
   };
`;

const ColoredDrowdownMenu = styled(Dropdown.Menu) `
   border:1px solid ${colors.logoDarkerBackground}!important;
   background-color:${colors.logoText}!important;
   color: ${colors.logoLighterBackground}!important;
`;

const StyledDropdownHeader = styled(Dropdown.Header) `
   margin: 0.5rem 0px 0px 0px!important;
   padding:1rem 1.14285714rem!important;
   background-color: ${colors.logoDarkerBackground}!important;
`;

const ColoredSpan = styled.span`
   color: ${colors.logoLighterBackground}!important;
`;

class ControlCenter extends React.Component {

   static propTypes = {
      viewer: propType(controlCenterFragments.viewer.document),
      onLogout: PropTypes.func.isRequired,
   }

   render() {
      const { viewer } = this.props;

      let managmentHeader,
         userManagmentLink,
         roleManagmentLink;
      if (readUser.check({}, viewer)) {
         userManagmentLink = <Dropdown.Item as={Link} to="/user" content={<ColoredSpan>User</ColoredSpan>} />;
      }
      if (readRole.check({}, viewer)) {
         roleManagmentLink = <Dropdown.Item as={Link} to="/role" content={<ColoredSpan>Role</ColoredSpan>} />;
      }
      if (userManagmentLink || roleManagmentLink) {
         managmentHeader = <StyledDropdownHeader content={"Managment"} />;
      }

      return (
         <FullHeightDrowdown item icon="content">
            <ColoredDrowdownMenu>
               <ViewerInfo viewer={viewer} />
               {managmentHeader}
               {userManagmentLink}
               {roleManagmentLink}
               <StyledDropdownHeader content={"Action"} />
               <Dropdown.Item onClick={this._logout} content={<ColoredSpan>Logout</ColoredSpan>} />
            </ColoredDrowdownMenu>
         </FullHeightDrowdown>
      );
   }

   _logout = (event) => {
      event.preventDefault();
      this.props.onLogout();
   }
}

export default ControlCenter;