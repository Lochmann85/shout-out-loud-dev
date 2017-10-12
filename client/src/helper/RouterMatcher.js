
/**
 * @public
 * @function constructor
 * @description the constructor for the route Matcher
 * @param {object} routerProps - The props of the router.
 */
function RouterMatcher(routerProps) {
   if (routerProps.location) {
      this.pathname = routerProps.location.pathname;
   }
}

/**
 * @public
 * @function isMatching
 * @description checks if the path is matching the path from the router props
 * @param {string} path - The props of the router.
 */
RouterMatcher.prototype.isMatching = function (path) {
   if (!this.pathname) {
      return false;
   }
   return this.pathname.includes(path);
};

/**
 * @public
 * @function isMatchingExactly
 * @description checks if the path is matching the path exactly from the router props
 * @param {string} path - The props of the router.
 */
RouterMatcher.prototype.isMatchingExactly = function (path) {
   if (!this.pathname) {
      return false;
   }
   return this.pathname === path;
};

export default RouterMatcher;