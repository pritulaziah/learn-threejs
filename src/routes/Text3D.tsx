import Canvas from "components/Canvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import getRandomArbitrary from "utils/getRandomArbitrary";
import { IDefault3DObject } from "types/objects";
import * as THREE from "three";
import useCanvas from "hooks/useCanvas";
import Default3DObject from "classes/common/DefaultObject";
import { createObjectFunc } from "utils/createBasicObjects";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const drawDonut = (object: IDefault3DObject) => {
  object.position.x = getRandomArbitrary(-5, 5);
  object.position.y = getRandomArbitrary(-5, 5);
  object.position.z = getRandomArbitrary(-5, 5);
  object.rotation.x = getRandomArbitrary(0, Math.PI);
  object.rotation.y = getRandomArbitrary(0, Math.PI);

  const scale = Math.random();
  object.scale.set(scale, scale, scale);
};

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(2, 3, 4);
  canvas.addLights([ambientLight, pointLight]);

  Promise.all([
    new FontLoader().loadAsync("fonts/helvetiker_bold.typeface.json"),
    new THREE.TextureLoader().loadAsync("assets/1.png"),
  ]).then(([font, matcapTexture]) => {
    const material = new THREE.MeshStandardMaterial({ map: matcapTexture });
    const textGeometry = new TextGeometry("Hello Three.js", {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    textGeometry.center();
    const text3D = createObjectFunc(material, textGeometry)();
    const objects: Default3DObject[] = [text3D];
    const createObject = createObjectFunc(
      material,
      new THREE.TorusGeometry(0.3, 0.2, 20, 45),
      { draw: drawDonut }
    );
    for (let i = 0; i < 100; i++) {
      const donut = createObject();
      objects.push(donut);
    }

    canvas.addObjects(objects);
  });

  return canvas;
};

const PageText3D = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default PageText3D;
