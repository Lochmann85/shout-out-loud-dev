import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import { Dropdown } from 'semantic-ui-react';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

import browserHistory from './../../../storeHandler/routerHistory';
import ViewerInfo from './ViewerInfo';

import controlCenterFragments from './../graphql/fragments/controlCenter';

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
      viewer: propType(controlCenterFragments.viewer.document)
   }

   render() {
      const { viewer } = this.props;

      return (
         <FullHeightDrowdown item icon="content">
            <ColoredDrowdownMenu>
               <ViewerInfo viewer={viewer} />
               <StyledDropdownHeader content={"Managment"} />
               <Dropdown.Item as={Link} to="/user" content={<ColoredSpan>User</ColoredSpan>} />
               <Dropdown.Item as={Link} to="/role" content={<ColoredSpan>Role</ColoredSpan>} />
               <StyledDropdownHeader content={"Action"} />
               <Dropdown.Item onClick={this._logout} content={<ColoredSpan>Logout</ColoredSpan>} />
            </ColoredDrowdownMenu>
         </FullHeightDrowdown>
      );
   }

   _logout = () => {
      localStorage.removeItem("jwtToken");
      browserHistory.push("/", { isLoginModalOpen: false });
   }
}

export default ControlCenter;