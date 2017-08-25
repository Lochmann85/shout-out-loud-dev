import fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefinitionsTemplate, schema } from './schema';
import resolvers from './resolvers';

import executable from './executableSchema';

/**
 * @public
 * @member graphQLServices
 * @description all graphql services
 */
const graphQLServices = {};

/**
 * @private
 * @function _requireAllGraphQLServices
 * @description loops through directory and requires all folders
 */
const _requireAllGraphQLServices = () => {
   const searchPatch = `${__dirname}/../services`;

   const directories = fs.readdirSync(searchPatch).filter(file => fs.statSync(`${searchPatch}/${file}`).isDirectory());

   directories.forEach(graphQLService => {
      graphQLServices[graphQLService] = require(`${searchPatch}/${graphQLService}`);
   });
};

/**
 * @private
 * @function _replaceNeedlesInSchema
 * @description replaces the needles in the schema string
 */
const _replaceNeedlesInSchema = () => {
   let types = "",
      queries = "",
      mutations = "",
      subscriptions = "";
   Object.keys(graphQLServices).forEach(graphQLService => {
      if (graphQLServices[graphQLService].types) {
         types += graphQLServices[graphQLService].types;
      }
      if (graphQLServices[graphQLService].queries) {
         queries += graphQLServices[graphQLService].queries;
      }
      if (graphQLServices[graphQLService].mutations) {
         mutations += graphQLServices[graphQLService].mutations;
      }
      if (graphQLServices[graphQLService].subscriptions) {
         subscriptions += graphQLServices[graphQLService].subscriptions;
      }
   });

   const typeDefinitions = typeDefinitionsTemplate(types, queries, mutations, subscriptions);

   schema[0] = typeDefinitions;
};

/**
 * @private
 * @function _buildExecutableSchema
 * @description creates the executable schema
 */
const _buildExecutableSchema = () => {
   const executableSchema = makeExecutableSchema({
      typeDefs: schema,
      resolvers: resolvers,
   });

   Object.keys(graphQLServices).forEach(graphQLService => {
      graphQLServices[graphQLService].addResolversTo(executableSchema);
   });

   executable.schema = executableSchema;
};

/**
 * @public
 * @function buildSchema
 * @description builds the graphql schema
 */
const buildSchema = () => new Promise((resolve, reject) => {
   _requireAllGraphQLServices();

   _replaceNeedlesInSchema();

   _buildExecutableSchema();

   resolve();
});

export {
   graphQLServices,
   buildSchema,
};