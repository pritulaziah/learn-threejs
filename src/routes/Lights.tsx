import Canvas from "components/Canvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import useCanvas from "hooks/useCanvas";
import UpdateObject from "classes/common/UpdateObject";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

const addPosition = (folder: dat.GUI, light: THREE.Object3D) => {
  folder.add(light.position, "x", -5, 5, 0.25);
  folder.add(light.position, "y", -5, 5, 0.25);
  folder.add(light.position, "z", -5, 5, 0.25);
};

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const update = (object: THREE.Object3D, delta: number) => {
    object.rotation.x = 0.1 * delta;
    object.rotation.y = 0.15 * delta;
  };
  const canvas = new DefaultCanvas(canvasElement, { cameraPositon: { z: 3 } });
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const sphere = new UpdateObject(
    new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material),
    {
      draw: (object) => {
        object.position.x = -1.5;
      },
      update,
    }
  );
  const cube = new UpdateObject(
    new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material),
    {
      update,
    }
  );
  const torus = new UpdateObject(
    new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material),
    {
      draw: (object) => {
        object.position.x = 1.5;
      },
      update,
    }
  );
  const plane = new UpdateObject(
    new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material),
    {
      draw: (object) => {
        object.rotation.x = -Math.PI * 0.5;
        object.position.y = -0.65;
      },
    }
  );

  // AmbientLight
  const ambientLight = new UpdateObject(new THREE.AmbientLight(0xffffff, 0), {
    debug: (object, gui) => {
      gui.addFolder("AmbientLight").add(object, "intensity", 0, 1, 0.001);
    },
  });

  // DirectionalLight
  const directionalLight = new UpdateObject(
    new THREE.DirectionalLight(0xffff2e, 0),
    {
      draw: (object) => {
        object.position.set(1, 0.25, 0);
      },
      debug: (object, gui) => {
        gui.addFolder("DirectionalLight").add(object, "intensity", 0, 1, 0.001);
      },
      helper: (object) => new THREE.DirectionalLightHelper(object, 0.2),
    }
  );

  // HemisphereLight
  const hemisphereLight = new UpdateObject(
    new THREE.HemisphereLight(0xff0000, 0x0000ff, 0),
    {
      debug: (object, gui) => {
        gui.addFolder("HemisphereLight").add(object, "intensity", 0, 1, 0.001);
      },
      helper: (object) => new THREE.HemisphereLightHelper(object, 0.2),
    }
  );

  // PointLight
  const pointLight = new UpdateObject(
    new THREE.PointLight(0xff9000, 0, 0, 0.5),
    {
      draw: (object) => {
        object.position.set(1, -0.5, 1);
      },
      debug: (object, gui) => {
        gui.addFolder("PointLight").add(object, "intensity", 0, 1, 0.001);
      },
      helper: (object) => new THREE.PointLightHelper(object, 0.2),
    }
  );

  // RectAreaLight
  const rectAreaLight = new UpdateObject(
    new THREE.RectAreaLight(0x4e00ff, 0, 2, 2),
    {
      draw: (object) => {
        object.position.set(0, 0, 1.5);
        object.lookAt(new THREE.Vector3());
      },
      debug: (object, gui) => {
        const folder = gui.addFolder("RectAreaLight");
        folder.add(object, "intensity", 0, 5, 0.25);
        folder.add(object, "width", 0, 4, 0.5);
        folder.add(object, "height", 0, 4, 0.5);
      },
      helper: (object) => new RectAreaLightHelper(object),
    }
  );

  // SpotLight
  const spotLight = new UpdateObject(
    new THREE.SpotLight(0x78ff00, 0, 10, Math.PI * 0.1, 0.25, 1),
    {
      draw: (object) => {
        object.position.set(0, 0, 3);
      },
      debug: (object, gui) => {
        const folder = gui.addFolder("SpotLight");
        folder.add(object, "intensity", 0, 1, 0.15);
        folder.add(object, "angle", 0, Math.PI, 0.025);
        folder.add(object, "penumbra", 0, 1, 0.1);
        addPosition(folder, object);
      },
      helper: (object) => new THREE.SpotLightHelper(object),
    }
  );

  canvas.addObject([
    sphere,
    cube,
    torus,
    plane,
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
