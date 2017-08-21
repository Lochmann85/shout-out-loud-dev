import express from 'express';
import path from 'path';

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';

import executable from './schema/executableSchema';

const reactAppDirectory = path.join(__dirname, "..", "..", "..", "client", "build");


const OPENSHIFT_PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
   OPENSHIFT_IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

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
      if (process.env.NODE_ENV === "production") {
         GRAPHQL_PORT = OPENSHIFT_PORT;
         graphQLServer.use(express.static(reactAppDirectory));
      }
      else {
         GRAPHQL_PORT = 3001;

         graphQLServer.use("/graphiql", graphiqlExpress({
            endpointURL: "/graphql",
         }));
      }

      graphQLServer.use("/graphql", bodyParser.json(), graphqlExpress((request) => {
         return {
            schema: executable.schema,
            context: {},
         };
      }));

      graphQLServer.listen(GRAPHQL_PORT, OPENSHIFT_IP, () => {
         console.log(`GraphQL Server is now running on http://${OPENSHIFT_IP}:${GRAPHQL_PORT}/graphql`); // eslint-disable-line no-console
         resolve();
      });
   });
};

export {
   graphQLServer,
   initializeGraphQLService,
};