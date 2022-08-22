import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import Torus from "./classes/Torus";
import Sphere from "./classes/Sphere";
import Plane from "./classes/Plane";
import DoorColorImagePath from "./static/textures/door/color.jpg";
import AlphaImagePath from "./static/textures/door/alpha.jpg";
import AmbientOcclusionImagePath from "./static/textures/door/ambientOcclusion.jpg";
import HeightImagePath from "./static/textures/door/height.jpg";
import MetalnessImagePath from "./static/textures/door/metalness.jpg";
import NormalImagePath from "./static/textures/door/normal.jpg";
import RoughnessImagePath from "./static/textures/door/roughness.jpg";
import Matcap1ImagePath from "./static/textures/matcaps/1.png";
import Matcap2ImagePath from "./static/textures/matcaps/2.png";
import Matcap3ImagePath from "./static/textures/matcaps/3.png";
import Matcap4ImagePath from "./static/textures/matcaps/4.png";
import Matcap5ImagePath from "./static/textures/matcaps/5.png";
import Matcap6ImagePath from "./static/textures/matcaps/6.png";
import Matcap7ImagePath from "./static/textures/matcaps/7.png";
import Matcap8ImagePath from "./static/textures/matcaps/8.png";
import Gradient3ImagePath from "./static/textures/gradients/3.jpg";
import Gradient5ImagePath from "./static/textures/gradients/5.jpg";
import MyObject3D, { MyMaterials } from "./classes/MyObject3D";
import {
  Textures,
  AlphaTextures,
  MatcapTextures,
  TextureValue,
  GradientMapTextures,
} from "./types/textures";
import { Materials } from "./types/materials";

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
    shininess: number;
    specular: string;
    texture: Textures;
    alphaTexture: AlphaTextures;
    matcap: MatcapTextures;
    flatShading: boolean;
    gradientMap: GradientMapTextures;
    generateMipmaps: boolean;
    minFilter: THREE.TextureFilter;
    magFilter: THREE.TextureFilter;
  };
  private objects: MyObject3D[];
  private lights: Array<THREE.Light | THREE.PointLight>;

  private static withoutTexture = { none: null };

  private static materials: { [key in Materials]: MyMaterials } = {
    lambert: new THREE.MeshLambertMaterial(),
    basic: new THREE.MeshBasicMaterial(),
    depth: new THREE.MeshDepthMaterial(),
    phong: new THREE.MeshPhongMaterial(),
    normal: new THREE.MeshNormalMaterial(),
    toon: new THREE.MeshToonMaterial(),
    matcap: new THREE.MeshMatcapMaterial(),
  };

  private static textures: { [key in Textures]: TextureValue } = {
    ...Canvas.withoutTexture,
    door: DoorColorImagePath,
    ambientOcclusion: AmbientOcclusionImagePath,
    height: HeightImagePath,
    normal: NormalImagePath,
    metalness: MetalnessImagePath,
    roughness: RoughnessImagePath,
  };

  private static alphaTextures: { [key in AlphaTextures]: TextureValue } = {
    ...Canvas.withoutTexture,
    alpha: AlphaImagePath,
  };

  private static matcapTextures: { [key in MatcapTextures]: TextureValue } = {
    ...Canvas.withoutTexture,
    matcap1: Matcap1ImagePath,
    matcap2: Matcap2ImagePath,
    matcap3: Matcap3ImagePath,
    matcap4: Matcap4ImagePath,
    matcap5: Matcap5ImagePath,
    matcap6: Matcap6ImagePath,
    matcap7: Matcap7ImagePath,
    matcap8: Matcap8ImagePath,
  };

  private static textureFilters: { [key: string]: THREE.TextureFilter } = {
    nearest: THREE.NearestFilter,
    linear: THREE.LinearFilter,
    linearMipmapLinear: THREE.LinearMipMapLinearFilter,
  };

  private static gradientMapTextures: {
    [key in GradientMapTextures]: TextureValue;
  } = {
    ...Canvas.withoutTexture,
    gradient3: Gradient3ImagePath,
    gradient5: Gradient5ImagePath,
  };

  constructor() {
    this.opts = {
      color: "#fff",
      wireframe: false,
      transparent: false,
      opacity: 1,
      material: "basic",
      shininess: 30,
      specular: "#111",
      texture: "none",
      alphaTexture: "none",
      matcap: "none",
      flatShading: false,
      gradientMap: "none",
      generateMipmaps: true,
      minFilter: Canvas.textureFilters.linearMipmapLinear,
      magFilter: Canvas.textureFilters.linear,
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
    const material = Canvas.materials.basic;
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

  private loadTexture(textureUrl: TextureValue) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureUrl ? textureLoader.load(textureUrl) : null;

    if (texture) {
      texture.minFilter = this.opts.minFilter;
      texture.magFilter = this.opts.magFilter;
      texture.generateMipmaps = this.opts.generateMipmaps;
    }

    return texture;
  }

  private createDebug() {
    const materials = this.gui.addFolder("Materials");
    materials.add(this.opts, "wireframe").onChange((value: boolean) => {
      for (const object of this.objects) {
        if ("wireframe" in object.material) {
          object.material.wireframe = value;
        }
      }
    });
    materials.add(this.opts, "transparent").onChange((value: boolean) => {
      for (const object of this.objects) {
        object.material.transparent = value;
        object.material.needsUpdate = true;
      }
    });
    materials.add(this.opts, "opacity", 0, 1, 0.1).onChange((value: number) => {
      for (const object of this.objects) {
        object.material.opacity = value;
        object.material.needsUpdate = true;
      }
    });
    materials.addColor(this.opts, "color").onChange((value: string) => {
      const color = new THREE.Color(value);

      for (const object of this.objects) {
        if ("color" in object.material) {
          object.material.color = color;
        }
      }
    });
    materials
      .add(this.opts, "material", Object.keys(Canvas.materials))
      .onChange((materialName: Materials) => {
        const material = Canvas.materials[materialName];

        for (const object of this.objects) {
          object.material = material;
        }
      });
    materials
      .add(this.opts, "shininess", 30, 1000, 100)
      .onChange((value: number) => {
        for (const object of this.objects) {
          if ("shininess" in object.material) {
            object.material.shininess = value;
          }
        }
      });
    materials.add(this.opts, "flatShading").onChange((value: boolean) => {
      for (const object of this.objects) {
        if ("flatShading" in object.material) {
          object.material.flatShading = value;
          object.material.needsUpdate = true;
        }
      }
    });
    materials.addColor(this.opts, "specular").onChange((value: string) => {
      const color = new THREE.Color(value);

      for (const object of this.objects) {
        if ("specular" in object.material) {
          object.material.specular = color;
        }
      }
    });
    materials.open();

    const texture = this.gui.addFolder("Textures");
    texture.add(this.opts, "generateMipmaps");
    texture.add(this.opts, "minFilter", Canvas.textureFilters);
    texture.add(this.opts, "magFilter", Canvas.textureFilters);
    texture
      .add(this.opts, "texture", Object.keys(Canvas.textures))
      .onChange((textureName: Textures) => {
        const textureUrl = Canvas.textures[textureName];
        const texture = this.loadTexture(textureUrl);

        for (const object of this.objects) {
          if ("map" in object.material) {
            object.material.map = texture;
            object.material.needsUpdate = true;
          }
        }
      });
    texture
      .add(this.opts, "alphaTexture", Object.keys(Canvas.alphaTextures))
      .onChange((textureName: AlphaTextures) => {
        const textureUrl = Canvas.alphaTextures[textureName];
        const texture = this.loadTexture(textureUrl);

        for (const object of this.objects) {
          if ("alphaMap" in object.material) {
            object.material.alphaMap = texture;
            object.material.needsUpdate = true;
          }
        }
      });
    texture
      .add(this.opts, "matcap", Object.keys(Canvas.matcapTextures))
      .onChange((textureName: MatcapTextures) => {
        const textureUrl = Canvas.matcapTextures[textureName];
        const texture = this.loadTexture(textureUrl);

        for (const object of this.objects) {
          if ("matcap" in object.material) {
            object.material.matcap = texture;
            object.material.needsUpdate = true;
          }
        }
      });
    texture
      .add(this.opts, "gradientMap", Object.keys(Canvas.gradientMapTextures))
      .onChange((textureName: GradientMapTextures) => {
        const textureUrl = Canvas.gradientMapTextures[textureName];
        const texture = this.loadTexture(textureUrl);

        for (const object of this.objects) {
          if ("gradientMap" in object.material) {
            object.material.gradientMap = texture;
            object.material.needsUpdate = true;
          }
        }
      });
    texture.open();
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
