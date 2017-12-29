import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import styled from 'styled-components';

import { Message, Header } from 'semantic-ui-react';

import colors from './../../assets/colors/shout-out-loud-colors.json';
import BaseLayoutLoader from './../../components/layout/BaseLayoutLoader';
import { SegmentBackground } from './../../assets/styled/UI';
import { WrapperWithOffset } from './../../assets/styled/Wrapper';
import BaseContentLayout from './../../components/layout/BaseContentLayout';
import { parseErrorMessage } from './../../components/errorHandling/parseError';

const SignedupHeader = styled(Header) `
   color:${colors.logoLighterBackground}!important;
`;
const DashboardLink = styled(Link) `
   color:${colors.logoDarkerBackground}!important;
   &:hover {
      color:${colors.logoLighterBackground}!important
   }
`;

class Signup extends React.Component {

   constructor(props) {
      super(props);

      this.loaded = false;
   }

   render() {
      const { signupConfirmationQuery } = this.props,
         queryHasError = signupConfirmationQuery.error ? true : false;

      if ((signupConfirmationQuery.loading && !this.loaded)) {
         this.loaded = true;
         return <BaseLayoutLoader />;
      }
      else {
         let message;

         if (queryHasError) {
            const errors = signupConfirmationQuery.error.networkError ?
               signupConfirmationQuery.error.networkError :
               signupConfirmationQuery.error.graphQLErrors;

            let shownErrors = [];
            errors.forEach(error => {
               shownErrors = [...shownErrors, ...parseErrorMessage(error)];
            });

            message = <Message negative
               list={shownErrors.map(error => error.message)} />;
         }
         else {
            if (signupConfirmationQuery.signupConfirmation) {
               localStorage.setItem("jwtToken", signupConfirmationQuery.signupConfirmation);
            }

            message = <div>
               <SignedupHeader as="h2" content="You are signed up!" />
               <p>Feel welcome to share all your thoughts with others.</p>
               <DashboardLink to="/">Newest thoughts</DashboardLink>
            </div>;
         }

         return (
            <WrapperWithOffset>
               <BaseContentLayout title="">
                  <SegmentBackground>
                     {message}
                  </SegmentBackground>
               </BaseContentLayout>
            </WrapperWithOffset>
         );
      }
   }
};

export default graphql(
   gql`query signupConfirmationQuery($signupToken: String!) {
      signupConfirmation(signupToken: $signupToken)
   }`,
   {
      name: "signupConfirmationQuery",
      options: (ownProps) => {
         return { variables: { signupToken: ownProps.match.params.token } };
      },
   }
)(Signup);