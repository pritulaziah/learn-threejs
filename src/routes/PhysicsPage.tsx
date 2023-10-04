import * as THREE from "three";
import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import PhysicsCanvas from "classes/PhysicsCanvas";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new PhysicsCanvas(canvasElement);
  canvas.setCameraPosition({ x: -3, y: 3, z: 3 });

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

  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const environmentMapTexture = cubeTextureLoader.load([
    "assets/textures/environmentMaps/0/px.png",
    "assets/textures/environmentMaps/0/nx.png",
    "assets/textures/environmentMaps/0/py.png",
    "assets/textures/environmentMaps/0/ny.png",
    "assets/textures/environmentMaps/0/pz.png",
    "assets/textures/environmentMaps/0/nz.png",
  ]);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: "#777777",
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
      envMapIntensity: 0.5,
    })
  );
  floor.receiveShadow = true;
  floor.rotation.x = -Math.PI * 0.5;

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
      envMapIntensity: 0.5,
    })
  );
  sphere.castShadow = true;
  sphere.position.y = 0.5;

  canvas.addStaticObject([floor, sphere]);

  return canvas;
};

const PhysicsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default PhysicsPage;
