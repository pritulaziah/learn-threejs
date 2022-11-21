import Canvas from "components/Canvas";
import LightsCanvas from "classes/LightsCanvas";
import useCanvas from "hooks/useCanvas";
import { createObjectFunc } from "utils/createBasicObjects";
import * as THREE from "three";
import { IDefault3DObject } from "types/objects";

const update = (object: IDefault3DObject, delta: number) => {
  object.rotation.x = 0.1 * delta;
  object.rotation.y = 0.15 * delta;
};

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new LightsCanvas(canvasElement);
  const material = new THREE.MeshStandardMaterial({ roughness: 0.4 });

  const sphere = createObjectFunc(
    material,
    new THREE.SphereGeometry(0.5, 32, 32)
  )({
    draw: (object) => {
      object.position.x = -1.5;
    },
    update,
  });
  const cube = createObjectFunc(
    material,
    new THREE.BoxGeometry(0.75, 0.75, 0.75)
  )({
    update,
  });
  const torus = createObjectFunc(
    material,
    new THREE.TorusGeometry(0.3, 0.2, 32, 64)
  )({
    draw: (object) => {
      object.position.x = 1.5;
    },
    update,
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
  canvas.addObjects([sphere, cube, torus, plane]);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0);
  const directionalLight = new THREE.DirectionalLight(0xffff2e, 0);
  directionalLight.position.set(1, 0.25, 0);
  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0);
  const pointLight = new THREE.PointLight(0xff9000, 0, 0, 0.5);
  pointLight.position.set(1, -0.5, 1);
  const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 4, 2, 2);
  canvas.addLights([
    ambientLight,
    directionalLight,
    hemisphereLight,
    pointLight,
    rectAreaLight,
  ]);
  return canvas;
};

const PageText3D = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default PageText3D;
