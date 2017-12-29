import BaseJwtTokenHandler from './../BaseJwtTokenHandler';
import { CustomError } from './../../errorsApi';
import { SIGNUP_JWT_SECRET } from './../../configurations';

class SignupTokenHandler extends BaseJwtTokenHandler {

   /**
   * @public
   * @function constructor
   * @description constructor of graphql jwt
    */
   constructor() {
      super(SIGNUP_JWT_SECRET, 60 * 30 /*30 min*/);
   }

   /**
    * @protected
    * @function _tokenExpiredError
    * @description the error which is used when the token is expired
    * @returns {object} error object
    */
   _tokenExpiredError = () => {
      return new CustomError("SignupTokenExpired", {
         message: "The signup E-Mail is expired. Please try again.",
         key: "token"
      });
   }

};

export default SignupTokenHandler;