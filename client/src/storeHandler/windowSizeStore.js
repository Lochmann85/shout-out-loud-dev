
/**
 * @public
 * @member
 * @description the size of the window
 */
let windowSize = {
   height: 0,
   width: 0,
};

/**
 * @private
 * @member
 * @description the resize observer
 */
const _observers = [];

/**
 * @private
 * @member
 * @description the size switches
 */
const MOBILE_WIDTH = 767;
const TABLET_WIDTH = 991;

/**
 * @public
 * @function addResizeObserver
 * @description add resize observers
 * @param {Function} observer - the observer function which is called
 */
const addResizeObserver = (observer) => {
   if (observer.hasOwnProperty("updateOnResize")) {
      _observers.push(observer);
   }
   else {
      throw new Error("FATAL ERROR: resize observer needs an updateOnResize function.");
   }
};

/**
 * @public
 * @function removeResizeObserver
 * @description removes resize observers
 * @param {Function} observer - the observer function which is called
 */
const removeResizeObserver = (observer) => {
   let index = _observers.indexOf(observer);
   if (index !== -1) {
      _observers.splice(index, 1);
   }
};

/**
 * @private
 * @function _handleResize
 * @description handles the change of the window and saves the size to the member
 * @param {Object} event - the window resize event
 */
const _handleResize = (event) => {
   if (event && event.target) {
      windowSize.height = event.target.innerHeight;
      windowSize.width = event.target.innerWidth;
   }
   _observers.forEach(observer => observer.updateOnResize());
};

/**
 * @public
 * @function initializeStore
 * @description Initializes the window size store
 * @param {Object} window - the window dom object
 */
const initializeStore = (window) => {
   window.addEventListener("resize", _handleResize);
   windowSize.height = window.innerHeight;
   windowSize.width = window.innerWidth;
};

/**
 * @public
 * @function windowIsMobile
 * @description checks if the window is mobile size
 * @returns {bool} true when window is mobile
 */
const windowIsMobile = () => {
   return windowSize.width <= MOBILE_WIDTH;
};

/**
 * @public
 * @function windowIsAtLeastTablet
 * @description checks if the window is mobile or tablet size
 * @returns {bool} true when window is mobile
 */
const windowIsAtLeastTablet = () => {
   return windowSize.width <= TABLET_WIDTH;
};

export {
   windowSize,
   initializeStore,
   addResizeObserver,
   removeResizeObserver,
   windowIsMobile,
   windowIsAtLeastTablet,
};