import * as THREE from "three";
import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import needUpdateMaterial from "utils/needUpdateMaterial";
import DefaultCanvas from "classes/common/DefaultCanvas";
import DefaultObject from "classes/common/DefaultObject";

type GalaxyOptions = {
  count: number;
  size: number;
  radius: number;
  branches: number;
  spin: number;
}

const mathUtils = THREE.MathUtils;

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const options: GalaxyOptions = {
    count: 1000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 1,
  };

  const canvas = new DefaultCanvas(canvasElement);
  canvas.setCameraPosition({ x: 3, y: 3, z: 3 });

  const geometry = new THREE.BufferGeometry();

  const material = new THREE.PointsMaterial({
    size: options.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const createVerices = (options: GalaxyOptions) => {
    const vertices = [];

    for (let i = 0; i < options.count; i++) {
      const angleBetweenSectors = (2 * Math.PI) / options.branches;
      const angle = angleBetweenSectors * i;
      const radius = mathUtils.randFloat(0, options.radius);
      const spinAngle = radius * options.spin;

      const x = radius * Math.cos(angle + spinAngle);
      const y = 0;
      const z = radius * Math.sin(angle + spinAngle);
      vertices.push(x, y, z);
    }

    return vertices;
  }

  const setPositon = (geometry: THREE.BufferGeometry, verices: number[]) => {
    const position = new THREE.Float32BufferAttribute(verices, 3);
    geometry.setAttribute("position", position);
  };

  const updatePosition = (object: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>) => {
    setPositon(object.geometry, createVerices(options));
    needUpdateMaterial(object.material);
  }

  const particles = new DefaultObject(new THREE.Points(geometry, material), {
    draw: (object) => {
      setPositon(object.geometry, createVerices(options));
    },
    debug: (object, gui) => {
      const folder = gui.addFolder("Galaxy");
      folder
        .add(options, "count")
        .min(100)
        .max(10000)
        .step(100)
        .onFinishChange(() => updatePosition(object));
      folder
        .add(options, "size")
        .min(0.001)
        .max(0.1)
        .step(0.001)
        .onFinishChange(() => {
          object.material.size = options.size;
          needUpdateMaterial(object.material);
        });
      folder
        .add(options, "radius")
        .min(1)
        .max(20)
        .step(1)
        .onFinishChange(() => updatePosition(object));
      folder
        .add(options, "branches")
        .min(2)
        .max(9)
        .step(1)
        .onFinishChange(() => updatePosition(object));
      folder
        .add(options, "spin")
        .min(-5)
        .max(5)
        .step(0.001)
        .onFinishChange(() => updatePosition(object));
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
