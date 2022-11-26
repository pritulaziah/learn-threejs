import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import ShadowsCanvas from "classes/ShadowsCanvas";
import * as THREE from "three";
import { createObjectFunc } from "utils/createBasicObjects";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new ShadowsCanvas(canvasElement);
  canvas.setCameraPosition({ x: 1, y: 1, z: 2 });
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(2, 2, -1);
  canvas.addStaticObject([ambientLight, directionalLight]);

  const material = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  const sphere = createObjectFunc(
    material,
    new THREE.SphereGeometry(0.5, 32, 32)
  )({});
  const plane = createObjectFunc(
    material,
    new THREE.PlaneGeometry(5, 5)
  )({
    draw: (object) => {
      object.rotation.x = -Math.PI * 0.5;
      object.position.y = -0.5;
    },
  });

  canvas.addDynamicObject([plane, sphere]);

  return canvas;
};

const ShadowsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default ShadowsPage;
