import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import { isEmail } from 'validator';

import {
   CustomError,
   InternalServerError,
   ForbiddenError
} from './../../../errorsApi';

const SALT_ROUNDS = 10;
const PASSWORD_LENGTH = 6;
const ObjectId = mongoose.Schema.Types.ObjectId;

const passwordValidate = {
   validator: function (newPassword) {
      return (newPassword.length >= PASSWORD_LENGTH);
   },
   message: "The new password is not of the required length (6+)."
};

const emailValidate = {
   validator: function (newEMail) {
      return isEmail(newEMail);
   },
   message: "Please provide a correct E-Mail."
};

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidate
   },
   name: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
      validate: passwordValidate,
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

const duplicateErrorMessage = "There already exists a user with the given E-Mail.";

userSchema.plugin(uniqueValidator, { message: duplicateErrorMessage });

/**
 * @private
 * @function _continueWithHashedPassword
 * @description hashes the passwor dand continues
 * @param {function} next - next step in pre mongoose middleware
 * @param {object} user - user object
 * @returns {Promise} of hash action
 */
const _continueWithHashedPassword = (next, user) => {
   return bcrypt.hash(user.password, SALT_ROUNDS).then(hashedPassword => {
      user.password = hashedPassword;
      next();
   }).catch(error => {
      next(error);
   });
};

/**
 * @private
 * @function pre("save")
 * @description pre save middleware, hashes the password of each new user
 */
userSchema.pre("save", function (next) {
   const newUser = this;

   // only hash the password if it has been modified (or is new)
   if (!newUser.isModified("password")) return next();

   _continueWithHashedPassword(next, newUser);
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
      if (passwordValidate.validator(update["$set"].password)) {
         _continueWithHashedPassword(next, update["$set"]);
      }
      else {
         next({ errors: { new: { message: passwordValidate.message } } });
      }
   }
   else if (update["$set"] && update["$set"].email && update["$set"].email !== "") {
      this.options.runValidators = true;
      if (emailValidate.validator(update["$set"].email)) {
         return next();
      }
      else {
         next({ errors: { email: { message: emailValidate.message } } });
      }
   }
   else {
      this.options.runValidators = true;
      return next();
   }
});

/**
 * @private
 * @function post("findOneAndUpdate")
 * @description post findOneAndUpdate middleware,
 * if the single username validation does not pass the error message is changed
 */
userSchema.post("findOneAndUpdate", (error, user, next) => {
   if (error.name === "MongoError" && error.code === 11000) {
      next({
         errors: { name: { message: duplicateErrorMessage } }
      });
   } else {
      next(error);
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