import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

declare global {
  interface Document {
    webkitExitFullscreen?: () => Promise<void>;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

class Canvas {
  sizes: {
    width: number;
    height: number;
  };
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Object3D;
  clock: THREE.Clock;
  controls: OrbitControls;

  static getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

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
    const count = 50 * 3 * 3;
    const positionsArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positionsArray[i] = Canvas.getRandomArbitrary(-2, 2);
    }

    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',positionsAttribute);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    // Clock
    this.clock = new THREE.Clock();
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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

  onOpenFullscreen = () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else {
        // nothing
      }
    }
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    // const elapsedTime = this.clock.getElapsedTime();
    // this.mesh.rotation.x = elapsedTime * 0.3;
    // this.mesh.rotation.y = elapsedTime * 0.3;
    // this.camera.position.x = Math.sin(elapsedTime);
    // this.camera.position.y = Math.cos(elapsedTime);
    // this.camera.lookAt(this.mesh.position)

    this.controls.update();

    this.render();
  };

  init = () => {
    this.controls.enableDamping = true;
    this.camera.position.z = 3;
    this.scene.add(this.mesh);
    document.body.appendChild(this.renderer.domElement);
    this.setSize();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("dblclick", this.onOpenFullscreen);
    this.render();
    this.animate();
  };
}

const canvas = new Canvas();
canvas.init();
