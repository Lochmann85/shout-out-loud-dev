import mongoose from 'mongoose';

const shoutSchema = new mongoose.Schema({
   message: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      required: true,
   },
   shouldBeShown: {
      type: Boolean,
      required: true,
   }
});

/**
 * @public
 * @function getEmptyShout
 * @description get empty shout skeleton
 * @returns {object} empty shout skeleton
 */
shoutSchema.statics.getEmptyShout = () => ({
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
   type: "Custom",
   shouldBeShown: true,
});

export default {
   schema: shoutSchema,
   name: "Shout"
};