import * as THREE from "three";
import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import createVerices3D from "utils/createVerices";
import DefaultCanvas from "classes/common/DefaultCanvas";
import DefaultObject from "classes/common/DefaultObject";

const COUNT_PARTICLES = 1000;
const RANGE = 3;
const SIZE = 0.02;
const mathUtils = THREE.MathUtils;

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  canvas.setCameraPosition({ x: 3, y: 3, z: 3 });

  const geometry = new THREE.BufferGeometry();

  const vertices = createVerices3D(COUNT_PARTICLES, () =>
    mathUtils.randFloatSpread(RANGE)
  );

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({
    size: SIZE,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particles = new DefaultObject(new THREE.Points(geometry, material));

  canvas.addObject(particles);

  return canvas;
};

const GalaxyGeneratorPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default GalaxyGeneratorPage;
