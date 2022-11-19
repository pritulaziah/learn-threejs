import Canvas from "components/Canvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import useCanvas from "hooks/useCanvas";
import { createObjectFunc } from "utils/createBasicObjects";
import * as THREE from "three";

const initCanvas = async (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  const material = new THREE.MeshStandardMaterial({ roughness: 0.4 });

  const sphere = createObjectFunc(
    material,
    new THREE.SphereGeometry(0.5, 32, 32)
  )({
    draw: (object) => {
      object.position.x = -1.5;
    },
  });
  const cube = createObjectFunc(
    material,
    new THREE.BoxGeometry(0.75, 0.75, 0.75)
  )();
  const torus = createObjectFunc(
    material,
    new THREE.TorusGeometry(0.3, 0.2, 32, 64)
  )({
    draw: (object) => {
      object.position.x = 1.5;
    },
  });
  const plane = createObjectFunc(
    material,
    new THREE.PlaneGeometry(5, 5)
  )({
    draw: (object) => {
      object.rotation.x = -Math.PI * 0.5;
      object.position.y = -0.65;
    },
  });
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  canvas.addObjects([sphere, cube, torus, plane]);
  canvas.addLights(light);
  canvas.init();
};

const PageText3D = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default PageText3D;
