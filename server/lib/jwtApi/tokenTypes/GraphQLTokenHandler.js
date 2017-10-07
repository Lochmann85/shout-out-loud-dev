import BaseJwtTokenHandler from './../BaseJwtTokenHandler';

import { GRAPHQL_JWT_SECRET } from './../../configurations';

class GraphQLTokenHandler extends BaseJwtTokenHandler {

   /**
   * @public
   * @function constructor
   * @description constructor of graphql jwt
    */
   constructor() {
      super(GRAPHQL_JWT_SECRET, 60 * 60 * 24 /*one day*/);
   }

};

export default GraphQLTokenHandler;