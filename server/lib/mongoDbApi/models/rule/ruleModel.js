import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ruleSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   }
});

const duplicateErrorMessage = `There already exists a rule with the given name.`;

ruleSchema.plugin(uniqueValidator, { message: duplicateErrorMessage });

export default {
   schema: ruleSchema,
   name: "Rule"
};