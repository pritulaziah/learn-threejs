import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import * as THREE from "three";
import { createObject } from "utils/createBasicObjects";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  canvas.setCameraPosition({ x: 1, y: 1, z: 2 });
  const ambientLight = createObject(new THREE.AmbientLight(0xffffff, 0.5), {
    debug: (object, gui) => {
      const ambientLightFolder = gui.addFolder("AmbientLight");
      ambientLightFolder.add(object, "intensity", 0, 1, 0.001);
    },
  });
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  const directionalLightObject = createObject(directionalLight, {
    draw: (object) => {
      object.position.set(2, 2, -1);
    },
    debug: (object, gui) => {
      const directionalLightFolder = gui.addFolder("DirectionalLight");
      directionalLightFolder.add(object, "intensity", 0, 1, 0.001);
      directionalLightFolder.add(object.position, "x", -5, 5, 0.001);
      directionalLightFolder.add(object.position, "y", -5, 5, 0.001);
      directionalLightFolder.add(object.position, "z", -5, 5, 0.001);
    },
  });
  const directionalLightHelper = createObject(
    new THREE.DirectionalLightHelper(directionalLight)
  );

  const material = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  const sphere = createObject(
    new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
  );
  const plane = createObject(
    new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material),
    {
      draw: (object) => {
        object.rotation.x = -Math.PI * 0.5;
        object.position.y = -0.5;
      },
    }
  );

  canvas.addObject([
    plane,
    sphere,
    ambientLight,
    directionalLightObject,
    directionalLightHelper,
  ]);

  return canvas;
};

const ShadowsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default ShadowsPage;
