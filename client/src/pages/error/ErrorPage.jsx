import React from 'react';

import { Message } from 'semantic-ui-react';

import { SegmentBackground } from './../../assets/styled/UI';
import { WrapperWithOffset } from './../../assets/styled/Wrapper';
import BaseContentLayout from './../../components/layout/BaseContentLayout';
import {
   parseErrorMessage,
   parseErrorStatus
} from './../../components/errorHandling/parseError';

const ErrorPage = ({ location: { state } }) => {

   let errorMessage = null,
      errorStatus = 500;

   if (state && Array.isArray(state.errors)) {
      const errors = state.errors;

      let shownErrors = [];

      errors.forEach(error => {
         errorStatus = parseErrorStatus(error);
         shownErrors = [...shownErrors, ...parseErrorMessage(error)];
      });

      errorMessage = <div>
         <Message negative
            header={"Error " + errorStatus + " occured"}
            list={shownErrors.map(error => error.message)}
         />
      </div>;
   }
   else {
      errorMessage = <Message negative
         header={"Error " + errorStatus + " occured"}
         list={["Ooops something bad happened."]}
      />;
   }

   return (
      <WrapperWithOffset>
         <BaseContentLayout title={`Error - ${errorStatus}`}>
            <SegmentBackground>
               {errorMessage}
            </SegmentBackground>
         </BaseContentLayout>
      </WrapperWithOffset>
   );
};

export default ErrorPage;