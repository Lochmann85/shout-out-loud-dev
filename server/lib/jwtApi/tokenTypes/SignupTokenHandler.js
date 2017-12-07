import BaseJwtTokenHandler from './../BaseJwtTokenHandler';

import { SIGNUP_JWT_SECRET } from './../../configurations';

class GraphQLTokenHandler extends BaseJwtTokenHandler {

   /**
   * @public
   * @function constructor
   * @description constructor of graphql jwt
    */
   constructor() {
      super(SIGNUP_JWT_SECRET, 60 * 30 /*30 min*/);
   }

};

export default GraphQLTokenHandler;