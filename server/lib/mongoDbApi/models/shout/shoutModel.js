import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const shoutSchema = new mongoose.Schema({
   message: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      required: true,
   },
   user: {
      type: ObjectId,
      ref: "User",
      required: true,
   },
   shouldBeShown: {
      type: Boolean,
      required: true,
   }
}, { timestamps: true });

/**
 * @public
 * @function getEmptyShout
 * @description get empty shout skeleton
 * @returns {object} empty shout skeleton
 */
shoutSchema.statics.getEmptyShout = () => ({
   id: "",
   message: "",
   type: "Empty",
   shouldBeShown: false,
});

/**
 * @public
 * @function alterShoutInput
 * @description adds to the shout input data for the shout skeleton
 * @returns {object} empty shout skeleton
 */
shoutSchema.statics.alterShoutInput = (shoutData) => ({
   message: shoutData ? shoutData.message : "",
   user: shoutData ? shoutData.user : "",
   type: "Custom",
   shouldBeShown: true,
});

export default {
   schema: shoutSchema,
   name: "Shout"
};