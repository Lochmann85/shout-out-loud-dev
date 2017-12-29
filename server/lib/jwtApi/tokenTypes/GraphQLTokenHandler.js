import BaseJwtTokenHandler from './../BaseJwtTokenHandler';
import { UnauthorizedError } from './../../errorsApi';
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

   /**
    * @protected
    * @function _tokenExpiredError
    * @description the error which is used when the token is expired
    * @returns {object} error object
    */
   _tokenExpiredError = () => {
      return new UnauthorizedError();
   }

};

export default GraphQLTokenHandler;