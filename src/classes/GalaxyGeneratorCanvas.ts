import * as THREE from "three";
import DefaultCanvas from "classes/common/DefaultCanvas";
import needUpdateMaterial from "utils/needUpdateMaterial";

const mathUtils = THREE.MathUtils;

type GalaxyOptions = {
  count: number;
  size: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
};

class GalaxyGeneratorCanvas extends DefaultCanvas {
  options: GalaxyOptions;
  particles: THREE.Points<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.PointsMaterial
  >;

  static createPoints(size: number) {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      size: size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
  }

  static createVerices = (options: GalaxyOptions) => {
    const vertices = [];

    for (let i = 0; i < options.count; i++) {
      const angleBetweenSectors = (2 * Math.PI) / options.branches;
      const angle = angleBetweenSectors * i;
      const radius = mathUtils.randFloat(0, options.radius);
      const spinAngle = radius * options.spin;

      const randomX =
        mathUtils.randFloatSpread(2) * options.randomness * radius;
      const randomY =
        mathUtils.randFloatSpread(2) * options.randomness * radius;
      const randomZ =
        mathUtils.randFloatSpread(2) * options.randomness * radius;

      const x = radius * Math.cos(angle + spinAngle) + randomX;
      const y = randomY;
      const z = radius * Math.sin(angle + spinAngle) + randomZ;
      vertices.push(x, y, z);
    }

    return vertices;
  };

  constructor(canvas: HTMLCanvasElement) {
    super(canvas, { cameraPositon: { x: 3, y: 3, z: 3 } });
    this.options = {
      count: 1000,
      size: 0.02,
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.2,
    };

    this.particles = GalaxyGeneratorCanvas.createPoints(this.options.size);
  }

  setPositon() {
    const position = new THREE.Float32BufferAttribute(
      GalaxyGeneratorCanvas.createVerices(this.options),
      3
    );
    this.particles.geometry.setAttribute("position", position);
  }

  updatePosition() {
    this.setPositon();
    needUpdateMaterial(this.particles.material);
  }

  createDebug() {
    const folder = this.gui.addFolder("Galaxy");
    folder
      .add(this.options, "count")
      .min(100)
      .max(10000)
      .step(100)
      .onFinishChange(() => this.updatePosition());
    folder
      .add(this.options, "size")
      .min(0.001)
      .max(0.1)
      .step(0.001)
      .onFinishChange(() => {
        this.particles.material.size = this.options.size;
        needUpdateMaterial(this.particles.material);
      });
    folder
      .add(this.options, "radius")
      .min(1)
      .max(20)
      .step(1)
      .onFinishChange(() => this.updatePosition());
    folder
      .add(this.options, "branches")
      .min(2)
      .max(9)
      .step(1)
      .onFinishChange(() => this.updatePosition());
    folder
      .add(this.options, "spin")
      .min(-5)
      .max(5)
      .step(0.001)
      .onFinishChange(() => this.updatePosition());
    folder
      .add(this.options, "randomness")
      .min(0)
      .max(2)
      .step(0.001)
      .onFinishChange(() => this.updatePosition());
    folder.open();
  }

  run() {
    this.scene.add(this.particles);
    this.setPositon();
    super.run();
  }
}

export default GalaxyGeneratorCanvas;
