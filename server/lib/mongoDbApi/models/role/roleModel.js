import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ObjectId = mongoose.Schema.Types.ObjectId;

const roleSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   isStatic: {
      type: Boolean,
   },
   rules: [{ type: ObjectId, ref: "Rule" }],
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

export default {
   schema: roleSchema,
   name: "Role"
};