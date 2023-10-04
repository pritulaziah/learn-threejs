import Canvas from "components/Canvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
import * as THREE from "three";
import useCanvas from "hooks/useCanvas";
import DefaultObject from "classes/common/DefaultObject";

const COUNT_PARTICLES = 20000;
const RANGE = 10;
const mathUtils = THREE.MathUtils;

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement);
  canvas.setCameraPosition({ z: 3 });

  const textureLoader = new THREE.TextureLoader();
  const particleTexture = textureLoader.load("assets/textures/particles/2.png");
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];

  for (let i = 0; i < COUNT_PARTICLES; i++) {
    const x = mathUtils.randFloatSpread(RANGE);
    const y = mathUtils.randFloatSpread(RANGE);
    const z = mathUtils.randFloatSpread(RANGE);
    vertices.push(x, y, z);
    colors.push(
      mathUtils.randFloat(0, 1),
      mathUtils.randFloat(0, 1),
      mathUtils.randFloat(0, 1)
    );
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    map: particleTexture,
    alphaMap: particleTexture,
    transparent: true,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    // blending: THREE.AdditiveBlending,
    vertexColors: true,
  });
  const particles = new DefaultObject(new THREE.Points(geometry, material), {
    debug(object, gui) {
      const folder = gui.addFolder("Points");
      folder
        .add(object.material, "sizeAttenuation")
        .onChange((value: boolean) => {
          object.material.sizeAttenuation = value;
          object.material.needsUpdate = true;
        });
      folder
        .add(object.material, "size", 0.01, 5, 0.01)
        .onChange((value: number) => {
          object.material.size = value;
        });
    },
    update(object, delta) {
      const { position } = object.geometry.attributes;

      if (position instanceof THREE.BufferAttribute) {
        for (let i = 0; i < COUNT_PARTICLES; i++) {
          const x = position.getX(i);
          position.setY(i, Math.sin(delta + x));
        }
      }
      position.needsUpdate = true;
    },
  });
  canvas.addObject(particles);

  return canvas;
};

const ParticlesPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default ParticlesPage;
