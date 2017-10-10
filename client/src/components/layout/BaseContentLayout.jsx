import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import colors from './../../assets/colors/shout-out-loud-colors.json';

const ColoredHeader = styled(Header) `
   color:${colors.logoDarkerBackground}!important;
`;

const ContentColumn = styled.div`
	margin: 0px 10px;
`;

const BaseContentLayout = ({ title, children }) => (
   <Grid container>
      <Grid.Row>
         <Grid.Column>
            <ColoredHeader as="h1" content={title} />
         </Grid.Column>
      </Grid.Row>
      <Grid.Row>
         <Grid.Column>
            <ContentColumn>
               {children}
            </ContentColumn>
         </Grid.Column>
      </Grid.Row>
   </Grid>
);

BaseContentLayout.propTypes = {
   title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
   ]),
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
   ]).isRequired
};

export default BaseContentLayout;
