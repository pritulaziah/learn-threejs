import Canvas from "components/Canvas";
import LightsCanvas from "classes/LightsCanvas";
import useCanvas from "hooks/useCanvas";
import { createObjectFunc } from "utils/createBasicObjects";
import * as THREE from "three";
import { IDefault3DObject } from "types/objects";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const update = (object: IDefault3DObject, delta: number) => {
    object.rotation.x = 0.1 * delta;
    object.rotation.y = 0.15 * delta;
  };
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
  canvas.addObject([sphere, cube, torus, plane]);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0);
  const directionalLight = new THREE.DirectionalLight(0xffff2e, 0);
  directionalLight.position.set(1, 0.25, 0);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2
  );
  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0);
  const hemisphereLightHelper = new THREE.HemisphereLightHelper(
    hemisphereLight,
    0.2
  );
  const pointLight = new THREE.PointLight(0xff9000, 0, 0, 0.5);
  pointLight.position.set(1, -0.5, 1);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
  const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 0, 2, 2);
  rectAreaLight.position.set(0, 0, 1.5);
  rectAreaLight.lookAt(new THREE.Vector3());
  const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
  const spotLight = new THREE.SpotLight(
    0x78ff00,
    0,
    10,
    Math.PI * 0.1,
    0.25,
    1
  );
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  spotLight.position.set(0, 0, 3);
  canvas.addDefaultObject3D([
    hemisphereLightHelper,
    directionalLightHelper,
    pointLightHelper,
    spotLightHelper,
    rectAreaLightHelper,
  ]);
  canvas.addLight([
    ambientLight,
    directionalLight,
    hemisphereLight,
    pointLight,
    rectAreaLight,
    spotLight,
  ]);

  return canvas;
};

const LightsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default LightsPage;
