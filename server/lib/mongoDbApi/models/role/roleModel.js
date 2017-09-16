import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import ruleModel from './ruleModel';
// import {
//    possibleRules,
//    possibleRulesets
// } from './../../../authorizationApi/possibleRules';

const roleSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   isStatic: {
      type: Boolean,
   },
   rules: [ruleModel.schema],
}, { timestamps: true });

const duplicateErrorMessage = `There already exists a role with the given name.`;

roleSchema.plugin(uniqueValidator, { message: duplicateErrorMessage });

/**
 * @private
 * @function pre("findOneAndUpdate")
 * @description pre findOneAndUpdate middleware, states that the returned role is the new one
 */
roleSchema.pre("findOneAndUpdate", function (next) {
   this.options.runValidators = true;
   this.options.new = true;
   this.options.context = "query";
   next();
});

/**
 * @private
 * @function post("findOneAndUpdate")
 * @description post findOneAndUpdate middleware,
 * if the single role name validation does not pass the error message is changed
 */
roleSchema.post("findOneAndUpdate", (error, user, next) => {
   if (error.name === "MongoError" && error.code === 11000) {
      next({
         errors: [{
            key: "type",
            message: duplicateErrorMessage,
         }]
      });
   } else {
      next(error);
   }
});

/**
 * @public
 * @function buildRoleWithRules
 * @description builds a new role with the selected rules
 * @param {object} roleData - user input
 * @returns {Promise} of new Instance of role model
 */
// roleSchema.statics.buildRoleWithRules = function (roleData) {
//    return new Promise((resolve, reject) => {
//       const Rule = this.internalModels.Rule,
//          rules = [];
//       possibleRules.forEach(possibleRule => {
//          const rule = {
//             name: possibleRule.name,
//             ruleset: {}
//          };
//          const foundRule = roleData.rules.find(rule => rule.name === possibleRule.name);
//          if (foundRule)
//             rule.ruleset = foundRule.ruleset;
//          else
//             possibleRulesets.forEach(possibleRule => {
//                rule.ruleset[possibleRule] = false;
//             });
//          rules.push(new Rule(rule));
//       });

//       resolve(new this({
//          name: roleData.name,
//          rules,
//          isStatic: false
//       }));
//    });
// };

/**
 * @public
 * @function instantiateInternalModels
 * @description instantiates the models of the internally used schemas
 * @param {object} mongoDbConnection - the connection to the mongoDb
 */
roleSchema.statics.instantiateInternalModels = function (mongoDbConnection) {
   this.internalModels = {};
   this.internalModels[ruleModel.name] = mongoDbConnection.model(ruleModel.name, ruleModel.schema);
};

export default {
   schema: roleSchema,
   name: "Role"
};