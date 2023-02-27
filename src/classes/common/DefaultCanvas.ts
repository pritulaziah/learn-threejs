import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IDefaultObject } from "types/objects";
import * as dat from "dat.gui";
import toArray from "utils/toArray";

class DefaultCanvas {
  private sizes: { width: number; height: number };
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private clock: THREE.Clock;
  private requestId?: number;
  public objects: IDefaultObject[];
  public gui: dat.GUI;

  constructor(canvas: HTMLCanvasElement) {
    // Request animation frame id
    this.requestId = undefined;
    // Sizes
    const { innerWidth, innerHeight } = window;
    this.sizes = { width: innerWidth, height: innerHeight };
    // Scene
    this.scene = new THREE.Scene();
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    // Dynamic objects
    this.objects = [];
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas });
    // Clock
    this.clock = new THREE.Clock();
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // Gui
    this.gui = new dat.GUI();
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
    this.requestId = requestAnimationFrame(this.animate);
    const elapsedTime = this.clock.getElapsedTime();

    for (const element of this.objects) {
      element.update(elapsedTime);
    }

    this.controls.update();
    this.render();
  };

  private addToScene(objects: THREE.Object3D<THREE.Event>[]) {
    this.scene.add(...objects);
  }

  public addObject(object: IDefaultObject[] | IDefaultObject) {
    const objectArray = toArray(object);
    this.objects.push(...objectArray);
    const helpers = objectArray.reduce<THREE.Object3D<THREE.Event>[]>(
      (result, obj) => {
        const currentHelper = obj.helper();

        if (currentHelper) {
          const currentHelperArray = toArray(currentHelper);
          result.push(...currentHelperArray);
        }

        return result;
      },
      []
    );
    this.addToScene([...objectArray.map((obj) => obj.object), ...helpers]);
  }

  public destroy() {
    this.gui.destroy();
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("dblclick", this.onOpenFullscreen);
    this.requestId != null && cancelAnimationFrame(this.requestId);
  }

  public createDebug() {
    for (let obj of this.objects) {
      obj.debug(this.gui);
    }
  }

  public setCameraPosition({ x = 0, y = 0, z = 0 }) {
    this.camera.position.set(x, y, z);
  }

  public run() {
    this.createDebug();
    this.setSize();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("dblclick", this.onOpenFullscreen);
    this.render();
    this.animate();
  }
}

export default DefaultCanvas;
