import PhysicsCanvas from "classes/common/PhysicsCanvas";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import PhysicUpdateObject from "./common/PhysicUpdateObject";

class LearnPhysicsCanvas extends PhysicsCanvas {
  static options = {
    cameraPositon: { x: -5, y: 5, z: 5 },
  };

  static wordOptions: CANNON.WorldOptions = {
    gravity: new CANNON.Vec3(0, -9.82, 0),
  };

  static createSphere(
    radius: number,
    { x, y, z }: { x: number; y: number; z: number },
    environmentMapTexture: THREE.CubeTexture
  ) {
    const sphereShape = new CANNON.Sphere(radius);
    const sphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(x, y, z),
      shape: sphereShape,
    });
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
      })
    );

    sphere.castShadow = true;
    sphere.position.set(x, y, z);

    return new PhysicUpdateObject(sphere, sphereBody);
  }

  constructor(canvas: HTMLCanvasElement) {
    super(canvas, LearnPhysicsCanvas.options, LearnPhysicsCanvas.wordOptions);

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
    const FLOOR_ROTATION_X = -Math.PI / 2;
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: floorShape,
    });
    floorBody.quaternion.setFromEuler(FLOOR_ROTATION_X, 0, 0);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#777777",
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
        side: THREE.DoubleSide,
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = FLOOR_ROTATION_X;
    this.word.addBody(floorBody);

    // Sphere
    const spheres = [
      LearnPhysicsCanvas.createSphere(
        0.5,
        { x: 0, y: 3, z: 0 },
        environmentMapTexture
      ),
    ];

    this.addToScene([ambientLight, directionalLight, floor]);

    for (const sphere of spheres) {
      this.addObject([sphere]);
      this.word.addBody(sphere.body);
    }
  }

  public run() {
    // this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    super.run();
  }
}

export default LearnPhysicsCanvas;
