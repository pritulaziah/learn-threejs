import Canvas from "components/Canvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import useCanvas from "hooks/useCanvas";
import {
  createCube,
  createSphere,
  createTorus,
  createPlane,
} from "utils/createBasicObjects";
import { createAmbientLight } from "utils/createLights";
import { createMeshStandardMaterial } from "utils/createMaterials";

const initCanvas = async (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  const material = createMeshStandardMaterial({ roughness: 0.4 });

  const sphere = createSphere(material)({
    draw: (object) => {
      object.position.x = -1.5;
    },
  });
  const cube = createCube(material)();
  const torus = createTorus(material)({
    draw: (object) => {
      object.position.x = 1.5;
    },
  });
  const plane = createPlane(material)({
    draw: (object) => {
      object.rotation.x = -Math.PI * 0.5;
      object.position.y = -0.65;
    },
  });
  const light = createAmbientLight(0xffffff, 0.5);
  canvas.addObjects([sphere, cube, torus, plane]);
  canvas.addLights(light);
  canvas.init();
};

const PageText3D = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default PageText3D;
