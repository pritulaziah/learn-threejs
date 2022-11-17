import Canvas from "../components/Canvas";
import DefaultCanvas from "../classes/common/DefaultCanvas";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Text3D from "../classes/Text3D";
import getRandomArbitrary from "../utils/getRandomArbitrary";
import { IDefault3DObject } from "../types/DefaultObject";
import * as THREE from "three";
import useCanvas from "../hooks/useCanvas";
import Default3DObject from "../classes/common/DefaultObject";

const drawDonut = (object: IDefault3DObject) => {
  object.position.x = getRandomArbitrary(-5, 5);
  object.position.y = getRandomArbitrary(-5, 5);
  object.position.z = getRandomArbitrary(-5, 5);
  object.rotation.x = getRandomArbitrary(0, Math.PI);
  object.rotation.y = getRandomArbitrary(0, Math.PI);

  const scale = Math.random();
  object.scale.set(scale, scale, scale);
};

const initCanvas = async (canvasElement: HTMLCanvasElement) => {
  const fontLoader = new FontLoader();
  const fontTexture = new THREE.TextureLoader();
  const [font, matcapTexture] = await Promise.all([
    fontLoader.loadAsync("fonts/helvetiker_bold.typeface.json"),
    fontTexture.loadAsync("assets/1.png"),
  ]);
  const material = new THREE.MeshStandardMaterial({ map: matcapTexture });
  const objects: Default3DObject[] = [new Text3D(font, material)];
  const geometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 100; i++) {
    const donut = new Default3DObject(geometry, material, { draw: drawDonut });
    objects.push(donut);
  }

  const canvas = new DefaultCanvas(canvasElement);
  canvas.addObjects(objects);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  canvas.addLights(ambientLight);
  canvas.init();
};

const PageText3D = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default PageText3D;
