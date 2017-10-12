import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import { Grid, Icon, Button, Header } from 'semantic-ui-react';

import colors from './../../../assets/colors/shout-out-loud-colors.json';

import viewerInfoFragments from './../graphql/fragments/viewerInfo';

const ColoredHeader = styled(Header) `
   color:${colors.logoLighterBackground}!important;
   > .sub.header {
      color:${colors.logoLighterBackground}!important;
   };
`;

const ViewerInfoWrapper = styled.div`
   width: 250px;
   margin: 15px 5px;
`;
const ViewerInfoGrid = styled(Grid) `
   & > .row {
      padding-top:0.75rem!important;
      padding-bottom:0.75rem!important;
   }
`;
const ViewerIcon = styled(Icon) `
   line-height: 1;
   vertical-align: middle;
   font-size: 6em!important;
`;

const ColoredBasicButton = styled(Button) `
   color:${colors.logoLighterBackground}!important;
   background: transparent none!important;
   border: 1px solid ${colors.logoDarkerBackground}!important;
   :hover {
      background: ${colors.darkerLogoText}!important;
   };
`;

const ViewerInfo = ({ viewer }) => {

   let header,
      profileButton = null;

   if (viewer) {
      header = <ColoredHeader>
         {viewer.name}
         <Header.Subheader content={viewer.role.name} />
      </ColoredHeader>;
      profileButton = <ColoredBasicButton as={Link} to={`/user/update/${viewer.id}`}>Profile</ColoredBasicButton>;
   }
   else {
      header = <ColoredHeader>
         {"Guest"}
         <Header.Subheader content={""} />
      </ColoredHeader>;
   }

   return (
      <ViewerInfoWrapper>
         <Grid>
            <Grid.Row>
               <Grid.Column width={6} verticalAlign="middle">
                  <ViewerIcon name={"user circle outline"} />
               </Grid.Column>
               <Grid.Column width={10}>
                  <ViewerInfoGrid>
                     <Grid.Row>
                        <Grid.Column>
                           {header}
                        </Grid.Column>
                     </Grid.Row>
                     <Grid.Row>
                        <Grid.Column>
                           {profileButton}
                        </Grid.Column>
                     </Grid.Row>
                  </ViewerInfoGrid>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </ViewerInfoWrapper>
   );
};

ViewerInfo.propTypes = {
   viewer: propType(viewerInfoFragments.viewer.document)
};

export default ViewerInfo;