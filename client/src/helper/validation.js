
/**
 * @public
 * @function checkForErrorInInput
 * @description Checks for an error key inside of the errors array
 * if found the related input has an error
 * @param {string} key - the input key
 * @param {array} errors - All errors.
 * @returns {boolean} true when error has been found
 */
const checkForErrorInInput = (key, errors) => {
   return errors.findIndex(error => error.key === key) > -1;
};

export default checkForErrorInInput;