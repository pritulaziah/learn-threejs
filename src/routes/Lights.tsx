import Canvas from "components/Canvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import useCanvas from "hooks/useCanvas";
import { createObject } from "utils/createBasicObjects";
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
  const canvas = new DefaultCanvas(canvasElement);
  canvas.setCameraPosition({ z: 3 });
  const material = new THREE.MeshStandardMaterial({ roughness: 0.4 });

  const sphere = createObject(
    new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material),
    {
      draw: (object) => {
        object.position.x = -1.5;
      },
      update,
    }
  );
  const cube = createObject(
    new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material),
    {
      update,
    }
  );
  const torus = createObject(
    new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material),
    {
      draw: (object) => {
        object.position.x = 1.5;
      },
      update,
    }
  );
  const plane = createObject(
    new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material),
    {
      draw: (object) => {
        object.rotation.x = -Math.PI * 0.5;
        object.position.y = -0.65;
      },
    }
  );

  // AmbientLight
  const ambientLight = new THREE.AmbientLight(0xffffff, 0);
  const ambientLightObject = createObject(ambientLight, {
    debug: (object, gui) => {
      gui.addFolder("AmbientLight").add(object, "intensity", 0, 1, 0.001);
    },
  });

  // DirectionalLight
  const directionalLight = new THREE.DirectionalLight(0xffff2e, 0);
  const directionalLightObject = createObject(directionalLight, {
    draw: (object) => {
      object.position.set(1, 0.25, 0);
    },
    debug: (object, gui) => {
      gui.addFolder("DirectionalLight").add(object, "intensity", 0, 1, 0.001);
    },
  });
  const directionalLightHelper = createObject(
    new THREE.DirectionalLightHelper(directionalLight, 0.2)
  );

  // HemisphereLight
  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0);
  const hemisphereLightObject = createObject(hemisphereLight, {
    debug: (object, gui) => {
      gui.addFolder("HemisphereLight").add(object, "intensity", 0, 1, 0.001);
    },
  });
  const hemisphereLightHelper = createObject(
    new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
  );

  // PointLight
  const pointLight = new THREE.PointLight(0xff9000, 0, 0, 0.5);
  const pointLightObject = createObject(pointLight, {
    draw: (object) => {
      object.position.set(1, -0.5, 1);
    },
    debug: (object, gui) => {
      gui.addFolder("PointLight").add(object, "intensity", 0, 1, 0.001);
    },
  });
  const pointLightHelper = createObject(
    new THREE.PointLightHelper(pointLight, 0.2)
  );

  // RectAreaLight
  const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 0, 2, 2);
  const rectAreaLightObject = createObject(rectAreaLight, {
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
  });
  const rectAreaLightHelper = createObject(
    new RectAreaLightHelper(rectAreaLight)
  );

  // SpotLight
  const spotLight = new THREE.SpotLight(
    0x78ff00,
    0,
    10,
    Math.PI * 0.1,
    0.25,
    1
  );
  const spotLightObject = createObject(spotLight, {
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
  });
  const spotLightHelper = createObject(new THREE.SpotLightHelper(spotLight));

  canvas.addObject([
    sphere,
    cube,
    torus,
    plane,
    hemisphereLightHelper,
    directionalLightHelper,
    pointLightHelper,
    spotLightHelper,
    rectAreaLightHelper,
    ambientLightObject,
    directionalLightObject,
    hemisphereLightObject,
    pointLightObject,
    rectAreaLightObject,
    spotLightObject,
  ]);

  return canvas;
};

const LightsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default LightsPage;
