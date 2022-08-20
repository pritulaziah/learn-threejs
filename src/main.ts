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
// import Matcap1ImagePath from "./static/textures/matcaps/1.png";
// import Gradient3ImagePath from "./static/textures/gradients/3.jpg";
import Torus from "./classes/Torus";
import Sphere from "./classes/Sphere";
import Plane from "./classes/Plane";
import My3DObject from "./classes/My3DObject";

type Textures =
  | "none"
  | "door"
  | "ambientOcclusion"
  | "height"
  | "metalness"
  | "normal"
  | "roughness";

type AlphaTextures = "none" | "alpha";

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
    alphaTexture: Textures;
    texture: Textures;
    color: string;
    wireframe: boolean;
    transparent: boolean;
    opacity: number;
  };
  private objects: My3DObject[];
  private static textures: { [key in Textures]: string | null } = {
    none: null,
    door: DoorColorImagePath,
    ambientOcclusion: AmbientOcclusionImagePath,
    height: HeightImagePath,
    normal: NormalImagePath,
    metalness: MetalnessImagePath,
    roughness: RoughnessImagePath,
  };
  private static alphaTextures: { [key in AlphaTextures]: string | null } = {
    none: null,
    alpha: AlphaImagePath,
  };

  constructor() {
    this.opts = {
      alphaTexture: "none",
      texture: "none",
      color: "#fff",
      wireframe: false,
      transparent: false,
      opacity: 1,
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
    this.objects = [
      new Torus(material),
      new Sphere(material),
      new Plane(material),
    ];
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

        for (const object of this.objects) {
          object.material.map = texture;
          object.material.needsUpdate = true;
        }
      })
      .setValue("none");
    texture
      .add(this.opts, "alphaTexture", Object.keys(Canvas.alphaTextures))
      .onChange((textureName: AlphaTextures) => {
        const textureUrl = Canvas.alphaTextures[textureName];
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

        for (const object of this.objects) {
          object.material.alphaMap = texture;
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
    this.scene.add(...this.objects.map((objectClass) => objectClass.object));
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
