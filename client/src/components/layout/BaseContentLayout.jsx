import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

import colors from './../../assets/colors/shout-out-loud-colors.json';

const BaseLayoutWrapper = styled.div`
   margin: 0 1rem;
   @media only screen and (max-width:767px) { 
      margin: 0 -1rem;
   };
`;

const ColoredHeader = styled(Header) `
   color:${colors.logoDarkerBackground}!important;
`;

const ContentColumn = styled.div`
	margin: 0px 10px;
`;

const BaseContentLayout = ({ title, children }) => (
   <BaseLayoutWrapper>
      <ColoredHeader as="h1" content={title} />
      <ContentColumn>
         {children}
      </ContentColumn>
   </BaseLayoutWrapper>
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
