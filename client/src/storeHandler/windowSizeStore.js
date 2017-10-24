
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
 * @function addWindowObserver
 * @description add resize observers
 * @param {Function} observer - the observer function which is called
 */
const addWindowObserver = (observer) => {
   _observers.push(observer);
};

/**
 * @public
 * @function removeWindowObserver
 * @description removes resize observers
 * @param {Function} observer - the observer function which is called
 */
const removeWindowObserver = (observer) => {
   let index = _observers.indexOf(observer);
   if (index !== -1) {
      _observers.splice(index, 1);
   }
};

/**
 * @private
 * @function _handleEvent
 * @description handles the updating of the observers
 * @param {string} updateFunctionName - the name of the update function
 */
const _handleEvent = (updateFunctionName) => {
   _observers.forEach(observer => {
      if (observer.hasOwnProperty(updateFunctionName)) {
         observer[updateFunctionName]();
      }
   });
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
   _handleEvent("updateOnResize");
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
 * @function windowIsSmallerAsPc
 * @description checks if the window is mobile or tablet size
 * @returns {bool} true when window is mobile
 */
const windowIsSmallerAsPc = () => {
   return windowSize.width <= TABLET_WIDTH;
};

/**
 * @public
 * @function windowIsLandscape
 * @description checks if the window is landscape
 * @returns {bool} true when window is landscape
 */
const windowIsLandscape = () => {
   return windowSize.width >= windowSize.height;
};

export {
   windowSize,
   initializeStore,
   addWindowObserver,
   removeWindowObserver,
   windowIsMobile,
   windowIsSmallerAsPc,
   windowIsLandscape
};