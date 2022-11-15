import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import DefaultObject3D from "./DefaultObject3D";

class DefaultCanvas {
  private sizes: { width: number; height: number };
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private clock: THREE.Clock;
  private lights: Array<THREE.Light | THREE.PointLight>;
  private objects: DefaultObject3D[];

  constructor(canvas: HTMLCanvasElement, objects: DefaultObject3D[]) {
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
    // Objects
    this.objects = [...objects];
    // Lights
    this.lights = [];
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas });
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

  private setSize() {
    this.renderer.setSize(this.width, this.height);
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  private onResize = () => {
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

  private onOpenFullscreen = () => {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else {
        // nothing
      }
    }
  };

  private animate = () => {
    requestAnimationFrame(this.animate);
    const elapsedTime = this.clock.getElapsedTime();

    for (const element of this.objects) {
      element.update(elapsedTime);
    }

    this.controls.update();
    this.render();
  };

  init() {
    this.camera.position.z = 3;
    this.scene.add(
      ...this.lights,
      ...this.objects.map((objectClass) => objectClass.object)
    );

    for (const element of this.objects) {
      element.draw();
    }

    this.setSize();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("dblclick", this.onOpenFullscreen);
    this.render();
    this.animate();
  }
}

export default DefaultCanvas;
