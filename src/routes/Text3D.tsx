import { useEffect, useRef } from "react";
import Canvas from "../components/Canvas";
import DefaultCanvas from "../classes/common/DefaultCanvas";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Text3D from "../classes/Text3D";
import Donut from "../classes/Donut";

const PageText3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current == null) return;
    let canvas: DefaultCanvas | null;

    const loader = new FontLoader();

    loader.load("fonts/helvetiker_bold.typeface.json", (font) => {
      const text3D = new Text3D(font);
      const objects = [text3D];

      for (let i = 0; i < 100; i++) {
        objects.push(new Donut());
      }

      canvas = new DefaultCanvas(canvasRef.current!, objects);
      canvas.init();
    });
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default PageText3D;
