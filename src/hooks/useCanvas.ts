import { useEffect, useRef } from "react";

const useCanvas = (initCanvas: (canvasElement: HTMLCanvasElement) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current == null) return;

    initCanvas(canvasRef.current);
  }, []);

  return canvasRef;
};

export default useCanvas;
