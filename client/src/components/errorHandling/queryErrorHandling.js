import React from 'react';
import { graphql } from 'react-apollo';

import BaseLayoutLoader from './../layout/BaseLayoutLoader';
import browserHistory from './../../storeHandler/routerHistory';

const queryErrorHandling = (queryDefinition) => {
   if (!queryDefinition.config.name) {
      throw new Error(`FATAL ERROR: the query in the queryErrorHandling must be named`);
   }

   return (WrappedComponent) => {
      class ErrorHandling extends React.Component {
         constructor(props) {
            super(props);

            this.loaded = false;
         }

         componentWillReceiveProps(nextProp) {
            if (nextProp[queryDefinition.config.name]) {

               const query = nextProp[queryDefinition.config.name];

               if (query && !query.loading && query.error) {
                  const errors = query.error.networkError ? query.error.networkError : query.error.graphQLErrors;

                  let hasUnauthorized = false;
                  errors.forEach(error => {
                     if (error.name === "Unauthorized") {
                        hasUnauthorized = true;
                     }
                  });
                  if (hasUnauthorized) {
                     browserHistory.push("/", { isLoginModalOpen: true });
                  }
                  else {
                     browserHistory.push("/error", { errors: errors });
                  }
               }
            }
         }

         render() {
            const query = this.props[queryDefinition.config.name],
               queryHasError = query && query.error ? true : false;

            if (query && (query.loading || queryHasError) && (!this.loaded || queryHasError)) {
               this.loaded = true;
               return <BaseLayoutLoader />;
            }
            else {
               return <WrappedComponent {...this.props} />;
            }
         }
      }

      const WrappedComponentWithData = graphql(
         queryDefinition.document,
         queryDefinition.config
      )(ErrorHandling);

      if (WrappedComponent.propTypes) {
         WrappedComponentWithData.propTypes = WrappedComponent.propTypes;
      }
      if (WrappedComponent.fragments) {
         WrappedComponentWithData.fragments = WrappedComponent.fragments;
      }

      return WrappedComponentWithData;
   };
};

export default queryErrorHandling;