import PhysicsCanvas from "classes/common/PhysicsCanvas";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import PhysicFloor from "./PhysicFloor";
import PhysicSphere from "./PhysicSphere";

class LearnPhysicsCanvas extends PhysicsCanvas {
  static options = {
    cameraPositon: { x: -5, y: 5, z: 5 },
  };

  static wordOptions: CANNON.WorldOptions = {
    gravity: new CANNON.Vec3(0, -9.82, 0),
  };

  constructor(canvas: HTMLCanvasElement) {
    super(canvas, LearnPhysicsCanvas.options, LearnPhysicsCanvas.wordOptions);
  }

  protected init() {
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);

    // Textures
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMapTexture = cubeTextureLoader.load([
      "assets/textures/environmentMaps/0/px.png",
      "assets/textures/environmentMaps/0/nx.png",
      "assets/textures/environmentMaps/0/py.png",
      "assets/textures/environmentMaps/0/ny.png",
      "assets/textures/environmentMaps/0/pz.png",
      "assets/textures/environmentMaps/0/nz.png",
    ]);

    // Material
    const physicsMaterial = new CANNON.Material();
    const physicsContactMaterial = new CANNON.ContactMaterial(
      physicsMaterial,
      physicsMaterial,
      {
        friction: 0.2,
        restitution: 0.4,
      }
    );
    this.word.addContactMaterial(physicsContactMaterial);
    this.word.defaultContactMaterial = physicsContactMaterial;

    // Floor
    const floor = new PhysicFloor({ envMap: environmentMapTexture });

    // Sphere
    const spheres = [
      new PhysicSphere({
        radius: 0.5,
        position: { x: 0, y: 3, z: 0 },
        envMap: environmentMapTexture,
      }),
    ];

    this.addStaticEntity([ambientLight, directionalLight]);
    this.addEntity([...spheres, floor]);

    // this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
}

export default LearnPhysicsCanvas;
