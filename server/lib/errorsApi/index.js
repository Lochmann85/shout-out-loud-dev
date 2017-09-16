import fs from 'fs';
import path from 'path';

const _searchPath = path.join(__dirname, "types");

/**
 * @description initializes all errors and saves them as .Error-name
 */
const files = fs.readdirSync(_searchPath);

files.forEach(errorFile => {
   const moduleName = errorFile.split(".")[0];

   exports[moduleName] = require(path.join(_searchPath, errorFile)).default;
});