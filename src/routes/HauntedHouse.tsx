import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import * as THREE from "three";
import createObject from "utils/createObject";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  canvas.setCameraPosition({ x: 4, y: 2, z: 5 });

  const sphere = createObject(
    new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({ roughness: 0.7 })
    ),
    {
      draw(object) {
        object.position.y = 1;
      },
    }
  );
  const floor = createObject(
    new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({
        color: "#a9c388",
        side: THREE.DoubleSide,
      })
    ),
    {
      draw(object) {
        object.rotation.x = -Math.PI * 0.5;
        object.position.y = 0;
      },
    }
  );

  const ambientLight = createObject(new THREE.AmbientLight(0xffffff, 0.5), {
    debug(object, gui) {
      gui.addFolder("AmbientLight").add(object, "intensity", 0, 1, 0.001);
    },
  });
  const moonLight = createObject(new THREE.DirectionalLight(0xffffff, 0.5), {
    draw(object) {
      object.position.set(4, 5, -2);
    },
    debug(object, gui) {
      const moonFolder = gui.addFolder("Moon");
      moonFolder.add(object, "intensity", 0, 1, 0.001);
      moonFolder.add(object.position, "x", -5, 5, 0.001);
      moonFolder.add(object.position, "y", -5, 5, 0.001);
      moonFolder.add(object.position, "z", -5, 5, 0.001);
    },
    helper(object) {
      return new THREE.DirectionalLightHelper(object);
    },
  });

  canvas.addObject([sphere, floor, ambientLight, moonLight]);

  return canvas;
};

const HauntedHousePage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default HauntedHousePage;
