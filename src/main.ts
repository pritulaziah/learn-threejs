import "./style.css";
import * as THREE from "three";

class Canvas {
  sizes: {
    width: number;
    height: number;
  };
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Object3D;
  clock: THREE.Clock

  constructor() {
    // Sizes
    const { innerWidth, innerHeight } = window;
    this.sizes = {
      width: innerWidth,
      height: innerHeight,
    };
    // Scene
    this.scene = new THREE.Scene();
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;
    this.scene.add(mesh);
    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    // Clock
    this.clock = new THREE.Clock()
    // Run init
    this.init();
  }

  get width() {
    return this.sizes.width;
  }

  get height() {
    return this.sizes.height;
  }

  setSize = () => {
    this.renderer.setSize(this.width, this.height);
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  onResize = () => {
    // Update sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.setSize();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.render();
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    const elapsedTime = this.clock.getElapsedTime();

    this.mesh.rotation.x = elapsedTime;
    this.mesh.rotation.y = elapsedTime;
    // this.camera.position.x = Math.sin(elapsedTime);
    // this.camera.position.y = Math.cos(elapsedTime);
    // this.camera.lookAt(this.mesh.position)

    this.render();
  };

  init = () => {
    this.camera.position.z = 3;
    document.body.appendChild(this.renderer.domElement);
    this.setSize();
    window.addEventListener("resize", this.onResize);
    this.render();
    this.animate();
  };
}

new Canvas();
