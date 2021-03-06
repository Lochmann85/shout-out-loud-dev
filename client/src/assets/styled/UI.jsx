import styled from 'styled-components';

import { Message, Segment, Icon, Form } from 'semantic-ui-react';

import colors from './../colors/shout-out-loud-colors.json';

const InfoMessage = styled(Message) `
   background-color: ${colors.logoText}!important;
   color: ${colors.logoLighterBackground}!important;
   border: 1px solid ${colors.logoDarkerBackground}!important;
`;

const SegmentBackground = styled(Segment) `
   background-color: ${colors.logoText}!important;
   color: ${colors.logoLighterBackground}!important;
   border: 1px solid ${colors.logoDarkerBackground}!important;
`;

const ColoredFormField = styled(Form.Field) `
   :not(.error)>label {
      color: ${colors.logoLighterBackground}!important;
   };
   >label {
      color: ${colors.lightErrorColor}!important;
   };
`;

const BaseIcon = styled(Icon) `
line-height: 1;
vertical-align: middle;
font-size: 1.5em!important;
`;

export {
   InfoMessage,
   SegmentBackground,
   ColoredFormField,
   BaseIcon,
};