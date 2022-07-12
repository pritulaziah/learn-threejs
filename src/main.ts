import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import Configuration from "./classes/Configuracion";

class Canvas {
  private opts: Configuration;
  private sizes: {
    width: number;
    height: number;
  };
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  // clock: THREE.Clock;
  private controls: OrbitControls;
  private gui: dat.GUI;

  // private static getRandomArbitrary(min: number, max: number) {
  //   return Math.random() * (max - min) + min;
  // }

  constructor() {
    // Configuration
    this.opts = new Configuration();
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
      color: this.opts.color,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    // Clock
    // this.clock = new THREE.Clock();
    //Gui
    this.gui = new dat.GUI();
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  get width() {
    return this.sizes.width;
  }

  get height() {
    return this.sizes.height;
  }

  private setSize = () => {
    this.renderer.setSize(this.width, this.height);
  };

  private render = () => {
    this.renderer.render(this.scene, this.camera);
  };

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
    // const elapsedTime = this.clock.getElapsedTime();
    // this.mesh.rotation.x = elapsedTime * 0.3;
    // this.mesh.rotation.y = elapsedTime * 0.3;
    // this.camera.position.x = Math.sin(elapsedTime);
    // this.camera.position.y = Math.cos(elapsedTime);
    // this.camera.lookAt(this.mesh.position)

    this.controls.update();

    this.render();
  };

  private createDebug = () => {
    const cube = this.gui.addFolder("Cube");
    cube.add(this.mesh.position, "y", -3, 3, 0.01);
    cube.add(this.mesh.position, "x", -3, 3, 0.01);
    cube.add(this.mesh.position, "z", -3, 3, 0.01);
    cube.add(this.mesh, "visible");
    cube.add(this.mesh.material, "wireframe");
    cube.addColor(this.opts, "color").onChange((color) => {
      this.mesh.material.color = new THREE.Color(color);
    });
    cube.open();
  };

  init = () => {
    this.createDebug();
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
