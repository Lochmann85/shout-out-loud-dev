import mongoose from 'mongoose';
import {
   emailValidation,
   passwordValidation
} from './../../validations';
import { continueWithHashedPassword } from './../../passwordEncription';

const accountConfirmationSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      validate: emailValidation
   },
   name: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
      validate: passwordValidation,
   },
   confirmAccountToken: {
      type: String,
      required: true
   },
});

/**
 * @private
 * @function pre("save")
 * @description pre save middleware, hashes the password of each new accountConfirmation
 */
accountConfirmationSchema.pre("save", function (next) {
   const newAccountConfirmation = this;

   // only hash the password if it has been modified (or is new)
   if (!newAccountConfirmation.isModified("password")) return next();

   continueWithHashedPassword(next, newAccountConfirmation);
});

export default {
   schema: accountConfirmationSchema,
   name: "AccountConfirmation"
};