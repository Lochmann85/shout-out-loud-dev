class BaseShout {
   constructor(message, type) {
      this._message = message;
      this._type = type;
   }

   get message() {
      return this._message;
   }

   get type() {
      return this._type;
   }

   set messsage(message) {
      this._message = message;
   }

   /**
    * @public
    * @function shouldBeShown
    * @description states if the shout should be shown
    * @returns {bool} true when shown
    */
   shouldBeShown() {
      throw new Error(`FATAL ERROR:  Shout of type "${this._type}" needs to implement the shouldBeShown function`);
   }
};

export default BaseShout;