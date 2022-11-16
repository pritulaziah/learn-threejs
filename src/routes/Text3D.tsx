import { useEffect, useRef } from "react";
import Canvas from "../components/Canvas";
import DefaultCanvas from "../classes/common/DefaultCanvas";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Text3D from "../classes/Text3D";
import Donut from "../classes/Donut";
import DefaultObject from "../types/DefaultObject";
import * as THREE from "three";

const PageText3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current == null) return;

    const initCanvas = async () => {
      const fontLoader = new FontLoader();
      const fontTexture = new THREE.TextureLoader();
      const [font, matcapTexture] = await Promise.all([
        fontLoader.loadAsync("fonts/helvetiker_bold.typeface.json"),
        fontTexture.loadAsync("assets/1.png"),
      ]);
      const material = new THREE.MeshStandardMaterial({ map: matcapTexture });
      const objects: DefaultObject[] = [new Text3D(font, material)];
      const geometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

      for (let i = 0; i < 100; i++) {
        objects.push(new Donut(geometry, material));
      }

      const canvas = new DefaultCanvas(canvasRef.current!, objects);
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      canvas.addLights(ambientLight);
      canvas.init();
    };

    initCanvas();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default PageText3D;
