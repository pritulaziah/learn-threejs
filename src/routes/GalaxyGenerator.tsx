import * as THREE from "three";
import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import DefaultObject from "classes/common/DefaultObject";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  canvas.setCameraPosition({ x: 3, y: 3, z: 3 });

  const cube = new DefaultObject(
    new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial()
    )
  );
  canvas.addObject(cube);

  return canvas;
};

const GalaxyGeneratorPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default GalaxyGeneratorPage;
