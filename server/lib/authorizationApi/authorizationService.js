
import {
   UnauthorizedError,
} from './../errorsApi';

/**
 * @public
 * @function authorizationMiddleware
 * @description middleware to check the authorization
 * @param {object} allowance - the needed allowance
 * @param {function} wrappedResolver - the wrapped resolver function
 * @returns {Promise} of executed graphQL resolver
 */
const authorizationMiddleware = (allowance) => (wrappedResolver) =>
   (_, args, context, info) => {
      if (context && context.viewer) {
         return context.viewer.check(allowance, args).then(() => {
            return wrappedResolver(_, args, context, info);
         });
      }
      else {
         return Promise.reject(new UnauthorizedError());
      }
   };

export {
   authorizationMiddleware
};
export { default as ReadRoleChecker } from './checker/ReadRoleChecker';
export { default as WriteRoleChecker } from './checker/WriteRoleChecker';
export { default as DeleteRoleChecker } from './checker/DeleteRoleChecker';
export { default as ReadUserChecker } from './checker/ReadUserChecker';
export { default as WriteUserChecker } from './checker/WriteUserChecker';
export { default as DeleteUserChecker } from './checker/DeleteUserChecker';
export { default as ShoutChecker } from './checker/ShoutChecker';
export { default as NotOwnRoleChecker } from './checker/NotOwnRoleChecker';
export { default as SelfChecker } from './checker/SelfChecker';
export { default as NotSelfChecker } from './checker/NotSelfChecker';