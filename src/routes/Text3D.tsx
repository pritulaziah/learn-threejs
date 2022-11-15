import { useEffect, useLayoutEffect, useRef } from "react";
import Canvas from "../components/Canvas";
import Text3DCanvas from "../classes/Text3DCanvas";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Text3D from "../classes/Text3D";

const PageText3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current == null) return;
    let canvas: Text3DCanvas | null;

    const loader = new FontLoader();

    loader.load("fonts/helvetiker_bold.typeface.json", (font) => {
      const text3D = new Text3D(font);
      canvas = new Text3DCanvas(canvasRef.current!, [text3D]);
      canvas.init();
    });
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default PageText3D;
