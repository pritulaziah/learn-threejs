import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import * as THREE from "three";
import DefaultObject from "classes/common/DefaultObject";
import DefaultCanvas from "classes/common/DefaultCanvas";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  canvas.renderer.shadowMap.enabled = true;
  canvas.setCameraPosition({ x: 1, y: 1, z: 2 });
  const ambientLight = new DefaultObject(
    new THREE.AmbientLight(0xffffff, 0.5),
    {
      debug(object, gui) {
        const ambientLightFolder = gui.addFolder("AmbientLight");
        ambientLightFolder.add(object, "intensity", 0, 1, 0.001);
      },
    }
  );
  const directionalLight = new DefaultObject(
    new THREE.DirectionalLight(0xffffff, 0.5),
    {
      draw(object) {
        object.castShadow = true;
        object.shadow.mapSize.width = 1024;
        object.shadow.mapSize.height = 1024;
        object.shadow.camera.near = 1;
        object.shadow.camera.far = 6;
        object.position.set(2, 2, -1);
      },
      debug(object, gui) {
        const directionalLightFolder = gui.addFolder("DirectionalLight");
        directionalLightFolder.add(object, "intensity", 0, 1, 0.001);
        directionalLightFolder.add(object.position, "x", -5, 5, 0.001);
        directionalLightFolder.add(object.position, "y", -5, 5, 0.001);
        directionalLightFolder.add(object.position, "z", -5, 5, 0.001);
      },
      helper: (object) => [
        new THREE.DirectionalLightHelper(object),
        new THREE.CameraHelper(object.shadow.camera),
      ],
    }
  );

  const material = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  const sphere = new DefaultObject(
    new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material),
    {
      draw(object) {
        object.castShadow = true;
      },
    }
  );
  const plane = new DefaultObject(
    new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material),
    {
      draw(object) {
        object.rotation.x = -Math.PI * 0.5;
        object.position.y = -0.5;
        object.receiveShadow = true;
      },
    }
  );

  canvas.addObject([plane, sphere, ambientLight, directionalLight]);

  return canvas;
};

const ShadowsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default ShadowsPage;
