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
    this.camera.position.z = 3;
    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    document.body.appendChild(this.renderer.domElement);

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

  addMesh() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }

  onResize = () => {
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

  init = () => {
    this.addMesh();
    this.setSize();
    this.render();

    window.addEventListener("resize", this.onResize);
  };
}

new Canvas();
