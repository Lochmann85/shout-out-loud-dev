import BaseShout from './../BaseShout';

class CustomShout extends BaseShout {
   constructor(shoutSkeleton) {
      super(shoutSkeleton.message, "Custom");
   }

   /**
    * @public
    * @function shouldBeShown
    * @description states if the shout should be shown
    * @returns {bool} true when shown
    */
   shouldBeShown() {
      return true;
   }
};

export default CustomShout;