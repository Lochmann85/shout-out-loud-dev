import express from 'express';
import path from 'path';

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';

import executable from './schema/executableSchema';

const reactAppDirectory = path.join(__dirname, "..", "..", "..", "client", "build");

let appServer = null;

/**
 * @public
 * @function initializeGraphQLService
 * @description Initializes the GraphQL server on the given port port
 * with 2 urls "/dev_graphql" and "/graphiql"
 * @param {object} serverConfig - configuration of server
 * @returns {Promise} of initialization
 */
const initializeGraphQLService = (serverConfig) => {
   return new Promise((resolve, reject) => {

      appServer = express();

      // Express only serves static assets in production
      if (serverConfig.isInProductionMode) {
         appServer.use(express.static(reactAppDirectory));

         appServer.get("/*", (request, response) => {
            // catch all routes and return index.html for production
            response.sendFile(path.join(reactAppDirectory, "index.html"));
         });
      }
      else {
         appServer.use("/graphiql", graphiqlExpress({
            endpointURL: "/dev_graphql",
         }));

         appServer.use("/dev_graphql", bodyParser.json(), graphqlExpress((request) => {
            return {
               schema: executable.schema,
               context: {},
            };
         }));

         console.log(`GraphiQL is now running on http://0.0.0.0:${serverConfig.PORT}/graphiql`); // eslint-disable-line no-console
      }

      resolve();
   });
};

export {
   appServer,
   initializeGraphQLService,
};