import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import Torus from "./classes/Torus";
import Sphere from "./classes/Sphere";
import Plane from "./classes/Plane";
import MyObject3D, { MyMaterials } from "./classes/MyObject3D";

enum Materials {
  Lambert = "lambert",
  Basic = "basic",
  Depth = "depth",
}

class Canvas {
  private sizes: {
    width: number;
    height: number;
  };
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  private controls: OrbitControls;
  private gui: dat.GUI;
  private opts: {
    color: string;
    wireframe: boolean;
    transparent: boolean;
    opacity: number;
    material: Materials;
  };
  private objects: MyObject3D[];
  private lights: Array<THREE.Light | THREE.PointLight>;

  private static materials: { [key in Materials]: MyMaterials } = {
    [Materials.Lambert]: new THREE.MeshLambertMaterial(),
    [Materials.Basic]: new THREE.MeshBasicMaterial(),
    [Materials.Depth]: new THREE.MeshDepthMaterial(),
  };

  constructor() {
    this.opts = {
      color: "#fff",
      wireframe: false,
      transparent: false,
      opacity: 1,
      material: Materials.Lambert,
    };
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
    const material = new THREE.MeshLambertMaterial();
    this.objects = [
      new Torus(material),
      new Sphere(material),
      new Plane(material),
    ];
    // Lights
    const ambientLight = new THREE.AmbientLight("#fff", 0.5);
    const pointLight = new THREE.PointLight("#fff", 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    this.lights = [ambientLight, pointLight];
    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    // Clock
    this.clock = new THREE.Clock();
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
      element.draw(elapsedTime);
    }

    this.controls.update();
    this.render();
  };

  private createDebug() {
    const objects = this.gui.addFolder("Objects");
    objects.add(this.opts, "wireframe").onChange((value: boolean) => {
      for (const object of this.objects) {
        object.material.wireframe = value;
      }
    });
    objects.add(this.opts, "transparent").onChange((value: boolean) => {
      for (const object of this.objects) {
        object.material.transparent = value;
        object.material.needsUpdate = true;
      }
    });
    objects.add(this.opts, "opacity", 0, 1, 0.1).onChange((value: number) => {
      for (const object of this.objects) {
        object.material.opacity = value;
        object.material.needsUpdate = true;
      }
    });
    objects.addColor(this.opts, "color").onChange((value) => {
      const color = new THREE.Color(value);

      for (const object of this.objects) {
        if ("color" in object.material) {
          object.material.color = color;
        }
      }
    });
    objects.open();

    const materials = this.gui.addFolder("Materials");
    materials
      .add(this.opts, "material", Object.keys(Canvas.materials))
      .onChange((materialName: Materials) => {
        const material = Canvas.materials[materialName];

        for (const object of this.objects) {
          object.material = material;
        }
      })
      .setValue(Materials.Basic);

    materials.open();
  }

  init() {
    this.createDebug();
    this.controls.enableDamping = true;
    this.camera.position.z = 3;
    this.scene.add(
      ...this.lights,
      ...this.objects.map((objectClass) => objectClass.object)
    );
    document.body.appendChild(this.renderer.domElement);
    this.setSize();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("dblclick", this.onOpenFullscreen);
    this.render();
    this.animate();
  }
}

const canvas = new Canvas();
canvas.init();
