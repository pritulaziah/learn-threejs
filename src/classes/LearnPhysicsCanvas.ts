import PhysicsCanvas from "classes/common/PhysicsCanvas";
import * as THREE from "three";
import * as CANNON from "cannon-es";

class LearnPhysicsCanvas extends PhysicsCanvas {
  sphere: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshStandardMaterial,
    THREE.Object3DEventMap
  >;
  sphereBody: CANNON.Body;

  static createAmbientLight() {
    return new THREE.AmbientLight(0xffffff, 0.7);
  }

  static createDirectionalLight() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);

    return directionalLight;
  }

  static createFloor(
    environmentMapTexture: THREE.CubeTexture
  ): [
    THREE.Mesh<
      THREE.PlaneGeometry,
      THREE.MeshStandardMaterial,
      THREE.Object3DEventMap
    >,
    CANNON.Body
  ] {
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

    return [floor, floorBody];
  }

  static createSphere(
    environmentMapTexture: THREE.CubeTexture
  ): [
    THREE.Mesh<
      THREE.SphereGeometry,
      THREE.MeshStandardMaterial,
      THREE.Object3DEventMap
    >,
    CANNON.Body
  ] {
    const SPHERE_RADIUS = 0.5;
    const sphereShape = new CANNON.Sphere(SPHERE_RADIUS);
    const sphereBody = new CANNON.Body({
      mass: 5,
      position: new CANNON.Vec3(0, 10, 0),
      shape: sphereShape,
    });
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(SPHERE_RADIUS, 32, 32),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
      })
    );

    sphere.castShadow = true;
    sphere.position.y = 0.0;

    return [sphere, sphereBody];
  }

  constructor(canvas: HTMLCanvasElement) {
    const options: CANNON.WorldOptions = {
      gravity: new CANNON.Vec3(0, -9.82, 0),
    };
    super(canvas, options);

    // Lights
    const ambientLight = LearnPhysicsCanvas.createAmbientLight();
    const directionalLight = LearnPhysicsCanvas.createDirectionalLight();

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
    const [floor, floorBody] = LearnPhysicsCanvas.createFloor(
      environmentMapTexture
    );
    this.word.addBody(floorBody);

    // Sphere
    const [sphere, sphereBody] = LearnPhysicsCanvas.createSphere(
      environmentMapTexture
    );
    this.word.addBody(sphereBody);
    this.sphere = sphere;
    this.sphereBody = sphereBody;

    this.addToScene([ambientLight, directionalLight, floor, sphere]);
  }

  protected customAnimate(elapsedTime: number) {
    super.customAnimate(elapsedTime);

    this.sphereBody.applyForce(
      new CANNON.Vec3(-0.5, 0, 0),
      this.sphereBody.position
    );

    this.sphere.position.set(
      this.sphereBody.position.x,
      this.sphereBody.position.y,
      this.sphereBody.position.z
    );
  }

  public run() {
    this.setCameraPosition({ x: -5, y: 5, z: 5 });
    // this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    super.run();
  }
}

export default LearnPhysicsCanvas;
