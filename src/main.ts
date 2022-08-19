import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import DoorColorImagePath from "./static/textures/door/color.jpg";
import AlphaImagePath from "./static/textures/door/alpha.jpg";
import AmbientOcclusionImagePath from "./static/textures/door/ambientOcclusion.jpg";
import HeightImagePath from "./static/textures/door/height.jpg";
import MetalnessImagePath from "./static/textures/door/metalness.jpg";
import NormalImagePath from "./static/textures/door/normal.jpg";
import RoughnessImagePath from "./static/textures/door/roughness.jpg";

type Textures =
  | "none"
  | "door"
  | "ambientOcclusion"
  | "alpha"
  | "height"
  | "metalness"
  | "normal"
  | "roughness";

enum ObjectTypes {
  Sphere = "sphere",
  Box = "box",
  Plane = "plane",
  Torus = "torus",
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
    texture: Textures;
    color: string;
    wireframe: boolean;
  };
  private objects: {
    [key in ObjectTypes]?: THREE.Mesh<
      | THREE.SphereBufferGeometry
      | THREE.PlaneBufferGeometry
      | THREE.TorusBufferGeometry,
      THREE.MeshBasicMaterial
    >;
  };

  private static textures: { [key in Textures]: string | null } = {
    none: null,
    door: DoorColorImagePath,
    alpha: AlphaImagePath,
    ambientOcclusion: AmbientOcclusionImagePath,
    height: HeightImagePath,
    normal: NormalImagePath,
    metalness: MetalnessImagePath,
    roughness: RoughnessImagePath,
  };

  constructor() {
    this.opts = {
      texture: "none",
      color: "#fff",
      wireframe: false,
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
    // Object
    const material = new THREE.MeshBasicMaterial();
    this.objects = {
      // box: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material),
      [ObjectTypes.Sphere]: new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.5, 16, 16),
        material
      ),
      [ObjectTypes.Plane]: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        material
      ),
      [ObjectTypes.Torus]: new THREE.Mesh(
        new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
        material
      ),
    };
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

    for (const object of Object.values(this.objects)) {
      object.rotation.x = elapsedTime * 0.3;
      object.rotation.y = elapsedTime * 0.3;
    }

    this.controls.update();
    this.render();
  };

  private createDebug() {
    const objects = this.gui.addFolder("Objects");
    objects.add(this.opts, "wireframe").onChange((value: boolean) => {
      for (const object of Object.values(this.objects)) {
        object.material.wireframe = value;
      }
    });
    objects.addColor(this.opts, "color").onChange((value) => {
      const color = new THREE.Color(value);

      for (const object of Object.values(this.objects)) {
        object.material.color = color;
      }
    });
    objects.open();

    const texture = this.gui.addFolder("Texture");
    texture
      .add(this.opts, "texture", Object.keys(Canvas.textures))
      .onChange((textureName: Textures) => {
        const textureUrl = Canvas.textures[textureName];
        const textureLoader = new THREE.TextureLoader();
        const texture = textureUrl ? textureLoader.load(textureUrl) : null;

        if (texture) {
          texture.center.x = 0.5;
          texture.center.y = 0.5;
          texture.repeat.x = 1;
          texture.repeat.y = 1;
          texture.minFilter = THREE.NearestFilter;
          texture.magFilter = THREE.NearestFilter;
          texture.generateMipmaps = false;
        }

        for (const object of Object.values(this.objects)) {
          object.material.map = texture;
          object.material.needsUpdate = true;
        }
      })
      .setValue("none");
    texture.open();
  }

  init() {
    this.createDebug();
    this.controls.enableDamping = true;
    this.camera.position.z = 3;

    for (const [name, object] of Object.entries(this.objects)) {
      switch (name) {
        case ObjectTypes.Sphere:
          object.position.x = -1.5;
          break;
        case ObjectTypes.Torus:
          object.position.x = 1.5;
          break;
        default:
          break;
      }
      this.scene.add(object);
    }

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
