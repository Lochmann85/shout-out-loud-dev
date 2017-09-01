import BaseShout from './../BaseShout';

class EmptyShout extends BaseShout {
   constructor() {
      super("", "Empty");
   }

   /**
    * @public
    * @function shouldBeShown
    * @description states if the shout should be shown
    * @returns {bool} true when shown
    */
   shouldBeShown() {
      return false;
   }
};

export default EmptyShout;