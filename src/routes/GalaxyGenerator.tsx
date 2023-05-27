import * as THREE from "three";
import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import createVerices from "utils/createVerices";
import needUpdateMaterial from "utils/needUpdateMaterial";
import DefaultCanvas from "classes/common/DefaultCanvas";
import DefaultObject from "classes/common/DefaultObject";

const RANGE = 3;
const mathUtils = THREE.MathUtils;

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const options = {
    count: 1000,
    size: 0.02,
  };

  const canvas = new DefaultCanvas(canvasElement);
  canvas.setCameraPosition({ x: 3, y: 3, z: 3 });

  const geometry = new THREE.BufferGeometry();

  const createCoordinate = () => mathUtils.randFloatSpread(RANGE);

  const setPositon = (geometry: THREE.BufferGeometry) => {
    const position = createVerices(options.count, createCoordinate);
    geometry.setAttribute("position", position);
  };

  const material = new THREE.PointsMaterial({
    size: options.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particles = new DefaultObject(new THREE.Points(geometry, material), {
    draw: (object) => {
      setPositon(object.geometry);
    },
    debug: (object, gui) => {
      const folder = gui.addFolder("Galaxy");
      folder
        .add(options, "count")
        .min(100)
        .max(10000)
        .step(100)
        .onFinishChange(() => {
          setPositon(object.geometry);
          needUpdateMaterial(object.material);
        });
      folder
        .add(options, "size")
        .min(0.001)
        .max(0.1)
        .step(0.001)
        .onFinishChange(() => {
          object.material.size = options.size;
          needUpdateMaterial(object.material);
        });
      folder.open();
    },
  });

  canvas.addObject(particles);

  return canvas;
};

const GalaxyGeneratorPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default GalaxyGeneratorPage;
