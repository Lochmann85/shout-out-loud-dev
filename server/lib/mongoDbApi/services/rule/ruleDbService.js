import { ruleModel } from './../../models';

import { MongooseSingleError } from './../../../errorsApi';

/**
 * @public
 * @function findAllRules
 * @description looks for all rules
 * @returns {Promise} of rules
 */
const findAllRules = () => {
   return ruleModel.find().exec()
      .catch(error => new MongooseSingleError(error));
};

export {
   findAllRules,
};