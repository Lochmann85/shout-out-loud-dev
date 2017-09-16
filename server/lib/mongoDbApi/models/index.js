import fs from 'fs';
import path from 'path';

const _schemas = {};

/**
 * @description initializes all models and saves them as .model-name
 */
const directories = fs.readdirSync(__dirname).filter(file => fs.statSync(path.join(__dirname, file)).isDirectory());

directories.forEach(modelDirectory => {
   const requirePath = path.join(__dirname, modelDirectory, `${modelDirectory}Model`);
   _schemas[`${modelDirectory}Model`] = require(requirePath).default;
});

const initializeDbModels = (mongoDbConnection) => {
   Object.keys(_schemas).forEach(key => {
      const model = mongoDbConnection.model(_schemas[key].name, _schemas[key].schema);

      if (model.instantiateInternalModels instanceof Function) {
         model.instantiateInternalModels(mongoDbConnection);
      }

      exports[key] = model;
   });
};

export {
   initializeDbModels
};