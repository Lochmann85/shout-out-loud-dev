import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import {
   emailValidation,
   passwordValidation
} from './../../validations';

import {
   CustomError,
   InternalServerError,
   ForbiddenError
} from './../../../errorsApi';
import { continueWithHashedPassword } from './../../passwordEncription';

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidation
   },
   name: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      validate: passwordValidation,
   },
   resetPasswordToken: {
      type: String
   },
   role: {
      type: ObjectId,
      ref: "Role",
      required: true,
   }
}, { timestamps: true });

const duplicateErrorMessage = "There already exists a user with the given {PATH}.";

userSchema.plugin(uniqueValidator, { message: duplicateErrorMessage });

/**
 * @private
 * @function pre("save")
 * @description pre save middleware, hashes the password of each new user
 */
userSchema.pre("save", function (next) {
   const newUser = this;

   // only hash the password if it has been modified (or is new)
   if (!newUser.isModified("password")) return next();

   continueWithHashedPassword(next, newUser);
});

/**
 * @private
 * @function pre("findOneAndUpdate")
 * @description pre findOneAndUpdate middleware, states that the returned user is the new one
 */
userSchema.pre("findOneAndUpdate", function (next) {
   this.options.new = true;
   this.options.context = "query";

   let update = this.getUpdate();
   if (update["$set"] && update["$set"].hasOwnProperty("password")) {
      if (passwordValidation.validator(update["$set"].password)) {
         continueWithHashedPassword(next, update["$set"]);
      }
      else {
         next({ errors: { new: { message: passwordValidation.message } } });
      }
   }
   else {
      this.options.runValidators = true;
      return next();
   }
});

/**
 * @public
 * @function comparePassword
 * @description compares the given password with the password from the database
 * @param {string} password - password of user
 * @returns {Promise} of user
 */
userSchema.methods.comparePassword = function (password) {
   return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password).then(isMatch => {
         if (isMatch) {
            resolve(this);
         }
         else {
            reject(new CustomError("WrongPassword", {
               message: "Please provide the correct password.",
               key: "password"
            }));
         }
      }).catch(error => reject(new InternalServerError({
         message: error.message,
         key: "BCRYPT_ERROR"
      })));
   });
};

/**
 * @public
 * @function check
 * @description checks the allowance dependend on the own rules
 * @param {object} allowance - the needed allowance
 * @param {object} args - the args of the request
 * @returns {Promise} of permission granted
 */
userSchema.methods.check = function (allowance, args) {
   return new Promise((resolve, reject) => {
      if (this.role && Array.isArray(this.role.rules)) {
         resolve(true);
      }
      else {
         reject(new ForbiddenError());
      }
   })
      .then(() => allowance.check(args, this));
};

/**
 * @public
 * @function has
 * @description checks if the user has a rule
 * @param {string} ruleName - the name of the rule
 * @returns {Promise} of found rule
 */
userSchema.methods.has = function (ruleName) {
   return new Promise((resolve, reject) => {
      const foundRule = this.role.rules.find(viewerRule => viewerRule.name === ruleName);
      if (foundRule) {
         resolve(true);
      }
      else {
         reject(new ForbiddenError());
      }
   });
};

export default {
   schema: userSchema,
   name: "User"
};