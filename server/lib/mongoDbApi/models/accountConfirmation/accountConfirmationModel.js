import mongoose from 'mongoose';
import {
   emailValidation,
   passwordValidation
} from './../../validations';

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

export default {
   schema: accountConfirmationSchema,
   name: "AccountConfirmation"
};