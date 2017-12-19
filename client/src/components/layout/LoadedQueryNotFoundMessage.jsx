import React from 'react';

import { InfoMessage } from './../../assets/styled/UI';

import BaseLayoutLoader from './BaseLayoutLoader';

export default ({ query, message }) => {
   if (query && (query.loading && !query.error)) {
      return <BaseLayoutLoader />;
   }
   else {
      return <InfoMessage visible content={message} />;
   }
};