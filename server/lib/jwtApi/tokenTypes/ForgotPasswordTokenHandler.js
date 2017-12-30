import BaseJwtTokenHandler from './../BaseJwtTokenHandler';
import { CustomError } from './../../errorsApi';
import { FORGOT_PASSWORD_JWT_SECRET } from './../../configurations';

class ForgotPasswordTokenHandler extends BaseJwtTokenHandler {

   /**
   * @public
   * @function constructor
   * @description constructor of graphql jwt
    */
   constructor() {
      super(FORGOT_PASSWORD_JWT_SECRET, 60 * 15 /*15 min*/);
   }

   /**
    * @protected
    * @function _tokenExpiredError
    * @description the error which is used when the token is expired
    * @returns {object} error object
    */
   _tokenExpiredError = () => {
      return new CustomError("ForgotPasswordTokenExpired", {
         message: "The forgot password E-Mail is expired. Please try again.",
         key: "token"
      });
   }

};

export default ForgotPasswordTokenHandler;