import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   ruleset: {
      read: {
         type: Boolean,
         required: true,
      },
      write: {
         type: Boolean,
         required: true,
      },
      delete: {
         type: Boolean,
         required: true,
      },
   },
});

export default {
   schema: ruleSchema,
   name: "Rule"
};