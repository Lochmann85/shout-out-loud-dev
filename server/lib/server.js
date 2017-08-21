import { buildSchema } from './graphQLApi/schema/graphQLSchemaBuilder';

import { initializeGraphQLService } from './graphQLApi/graphQLService';

buildSchema();

initializeGraphQLService().catch(error => console.log(error));