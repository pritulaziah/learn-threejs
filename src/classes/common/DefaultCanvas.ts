import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import * as dat from "dat.gui";
import toArray from "utils/toArray";
import Entity from "./Entity";

export type DefaultCanvasOptions = {
  cameraPositon?: { x?: number, y?: number, z?: number };
}

class DefaultCanvas {
  private sizes: { width: number; height: number };
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private clock: THREE.Clock;
  private requestId?: number;
  public gui: dat.GUI;
  public stats: Stats;

  protected entities: Entity[] = [];

  constructor(canvas: HTMLCanvasElement, options?: DefaultCanvasOptions) {
    const { cameraPositon } = options || {};
    const { x = 0, y = 0, z = 0 } = cameraPositon || {};
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
    this.camera.position.set(x, y, z);
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.gui = new dat.GUI();
    this.stats = new Stats();
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

  protected customAnimate(_: number) {}

  private animate = () => {
    this.requestId = requestAnimationFrame(this.animate);
    const elapsedTime = this.clock.getElapsedTime();

    this.customAnimate(elapsedTime);

    for (const element of this.entities) {
      element.update(elapsedTime);
    }

    this.controls.update();
    this.render();
    this.stats.update();
  };

  protected addEntitiesToScene() {
    for (const element of this.entities) {
      element.addToScene(this.scene);
    }
  }

  public addEntity(object: Entity[] | Entity) {
    const objectArray = toArray(object);
    this.entities.push(...objectArray);
  }

  public addStaticEntity(object: THREE.Object3D | THREE.Object3D[]) {
    const objectArray = toArray(object);
    this.scene.add(...objectArray);
  }

  public destroy() {
    this.gui.destroy();
    this.stats.end();
    this.stats.dom.remove();
    this.renderer.dispose();
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("dblclick", this.onOpenFullscreen);
    this.requestId != null && cancelAnimationFrame(this.requestId);
  }

  public createDebug() {}

  protected init() {}

  public run() {
    this.init();
    this.addEntitiesToScene();
    this.createDebug();
    this.setSize();

    for (const element of this.entities) {
      element.draw();
    }

    window.addEventListener("resize", this.onResize);
    window.addEventListener("dblclick", this.onOpenFullscreen);
    document.body.appendChild(this.stats.dom);
    this.render();
    this.animate();
  }
}

export default DefaultCanvas;
