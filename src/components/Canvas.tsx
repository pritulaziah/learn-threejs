import { forwardRef } from "react";

const Canvas = forwardRef<HTMLCanvasElement>((_, ref) => (
  <canvas ref={ref}></canvas>
));

export default Canvas;
