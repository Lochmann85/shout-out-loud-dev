import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

import {
   CustomError,
   InternalServerError
} from './../../../errorsApi';

const SALT_ROUNDS = 10;
const PASSWORD_LENGTH = 6;
const ObjectId = mongoose.Schema.Types.ObjectId;

const passwordValidate = {
   validator: function (newPassword) {
      return (newPassword.length >= PASSWORD_LENGTH);
   },
   message: "The new password is not of the required length (6+)"
};

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      validate: passwordValidate,
      required: true,
   },
   role: {
      type: ObjectId,
      ref: "Role",
      required: true,
   }
}, { timestamps: true });

const duplicateErrorMessage = "There already exists a user with the given name.";

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
         next({
            errors: { new: { message: passwordValidate.message } }
         });
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

export default {
   schema: userSchema,
   name: "User"
};