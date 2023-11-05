import * as THREE from "three";
import * as CANNON from "cannon-es";
import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import PhysicsCanvas from "classes/common/PhysicsCanvas";
import DefaultObject from "classes/common/DefaultObject";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new PhysicsCanvas(canvasElement, {
    gravity: new CANNON.Vec3(0, -9.82, 0),
  });
  canvas.setCameraPosition({ x: -5, y: 5, z: 5 });

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  canvas.addStaticObject(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.far = 15;
  directionalLight.shadow.camera.left = -7;
  directionalLight.shadow.camera.top = 7;
  directionalLight.shadow.camera.right = 7;
  directionalLight.shadow.camera.bottom = -7;
  directionalLight.position.set(5, 5, 5);
  canvas.addStaticObject(directionalLight);

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
  canvas.word.addContactMaterial(physicsContactMaterial);
  canvas.word.defaultContactMaterial = physicsContactMaterial;

  // Floor
  const FLOOR_ROTATION_X = -Math.PI / 2;
  const floorShape = new CANNON.Plane();
  const floorBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: floorShape,
  });
  floorBody.quaternion.setFromEuler(FLOOR_ROTATION_X, 0, 0);
  canvas.word.addBody(floorBody);
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

  // Sphere
  const SPHERE_RADIUS = 0.5;
  const sphereShape = new CANNON.Sphere(SPHERE_RADIUS);
  const sphereBody = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, 10, 0),
    shape: sphereShape,
  });
  canvas.word.addBody(sphereBody);
  const sphere = new DefaultObject(
    new THREE.Mesh(
      new THREE.SphereGeometry(SPHERE_RADIUS, 32, 32),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
      })
    ),
    {
      update(object) {
        sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);

        object.position.set(
          sphereBody.position.x,
          sphereBody.position.y,
          sphereBody.position.z
        );
      },
      draw(object) {
        object.castShadow = true;
        object.position.y = 0.5;
      },
    }
  );

  // Add objects to canvas
  canvas.addStaticObject(floor);
  canvas.addObject(sphere);

  return canvas;
};

const PhysicsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default PhysicsPage;
