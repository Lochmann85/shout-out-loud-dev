class FontSizeCalculator {
   constructor() {
      const canvas = document.createElement("canvas");
      this._context = canvas.getContext("2d");
      this._font = "Arial";
   }

   calculate(rectangle, padding, text) {
      let height = rectangle.clientHeight,
         width = rectangle.clientWidth;

      this._context.font = `${height}px ${this._font}`;
      const metrics = this._context.measureText(text);

      const difference = width - metrics.width - 2 * padding;
      if (difference >= 0) {
         return height;
      }
      else if (metrics.width) {
         const ratio = (width - 2 * padding) / metrics.width;
         return height * ratio;
      }
      return "20";
   }
}

export default new FontSizeCalculator();