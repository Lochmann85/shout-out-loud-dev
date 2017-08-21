import express from 'express';
import path from 'path';

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';

import executable from './schema/executableSchema';

const reactAppDirectory = path.join(__dirname, "..", "..", "..", "client", "build");

let graphQLServer = null;

/**
 * @public
 * @function initializeGraphQLService
 * @description Initializes the GraphQL server on the given port port
 * with 2 urls "/graphql" and "/graphiql"
 * @returns {Promise} of initialization
 */
const initializeGraphQLService = () => {
   return new Promise((resolve, reject) => {

      graphQLServer = express();

      let GRAPHQL_PORT;

      // Express only serves static assets in production
      if (process.env.NODE_ENV === 'production') {
         GRAPHQL_PORT = 3000;

         graphQLServer.use(express.static(reactAppDirectory));
      }
      else {
         GRAPHQL_PORT = 3001;
      }

      graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress((request) => {
         return {
            schema: executable.schema,
            context: {},
         };
      }));

      graphQLServer.use('/graphiql', graphiqlExpress({
         endpointURL: '/graphql',
      }));

      graphQLServer.listen(GRAPHQL_PORT, () => {
         console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`); // eslint-disable-line no-console
         resolve();
      });
   });
};

export {
   graphQLServer,
   initializeGraphQLService,
};