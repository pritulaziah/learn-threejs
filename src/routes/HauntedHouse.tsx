import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import HauntedHouseCanvas from "classes/HauntedHouseCanvas";
import * as THREE from "three";
import DefaultObject from "classes/common/DefaultObject";

const WORLD_SIZE = 20;
const HOUSE_HEIGHT = 2.5;
const HOUSE_WIDTH = 4;
const ROOF_HEIGHT = 1;
const DOOR_HEIGHT = 2;
const GRAVE_WIDTH = 0.6;
const GRAVE_HEIGHT = 0.8;

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new HauntedHouseCanvas(canvasElement);
  canvas.setCameraPosition({ x: 4, y: 2, z: 5 });
  // Objects
  const floor = new DefaultObject(
    new THREE.Mesh(
      new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE),
      new THREE.MeshStandardMaterial({
        color: "#a9c388",
        side: THREE.DoubleSide,
      })
    ),
    {
      draw(object) {
        object.rotation.x = -Math.PI * 0.5;
        object.position.y = 0;
      },
    }
  );
  const house = new THREE.Group();
  // Walls
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(HOUSE_WIDTH, HOUSE_HEIGHT, HOUSE_WIDTH),
    new THREE.MeshStandardMaterial({ color: "#ac8382" })
  );
  walls.position.y = HOUSE_HEIGHT / 2;
  // Roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, ROOF_HEIGHT, 4),
    new THREE.MeshStandardMaterial({ color: "#b35f45" })
  );
  roof.position.y = HOUSE_HEIGHT + ROOF_HEIGHT / 2;
  roof.rotation.y = Math.PI * 0.25;
  // Door
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, DOOR_HEIGHT),
    new THREE.MeshStandardMaterial({ color: "#aa7b7b" })
  );
  door.position.y = DOOR_HEIGHT / 2;
  door.position.z = HOUSE_WIDTH / 2 + 0.01;
  // Bushes
  const bushes = new THREE.Group();
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });
  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush1.scale.set(0.5, 0.5, 0.5);
  bush1.position.set(0.8, 0.2, 2.2);
  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush2.scale.set(0.25, 0.25, 0.25);
  bush2.position.set(1.4, 0.1, 2.1);
  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush3.scale.set(0.4, 0.4, 0.4);
  bush3.position.set(-0.8, 0.1, 2.2);
  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush4.scale.set(0.15, 0.15, 0.15);
  bush4.position.set(-1, 0.05, 2.6);
  bushes.add(bush1, bush2, bush3, bush4);
  // Graves
  const graves = new THREE.Group();
  const graveGeometry = new THREE.BoxGeometry(GRAVE_WIDTH, GRAVE_HEIGHT, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius =
      HOUSE_WIDTH +
      Math.random() * (WORLD_SIZE / 2 - HOUSE_WIDTH - GRAVE_WIDTH / 2);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, GRAVE_HEIGHT / 2 - 0.1, z);
    grave.rotation.x = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    graves.add(grave);
  }
  // Door light
  const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
  doorLight.position.set(0, 2.2, 2.7);

  // Add all
  house.add(walls, roof, door, bushes, graves, doorLight);
  const houseObject = new DefaultObject(house);
  const objects = [floor, houseObject];
  // Lights
  const lightColor = "#b9d5ff";
  const lightIntensity = 0.12;
  const ambientLight = new DefaultObject(
    new THREE.AmbientLight(lightColor, lightIntensity),
    {
      debug(object, gui) {
        gui.addFolder("AmbientLight").add(object, "intensity", 0, 1, 0.001);
      },
    }
  );
  const moonLight = new DefaultObject(
    new THREE.DirectionalLight(lightColor, lightIntensity),
    {
      draw(object) {
        object.position.set(4, 5, -2);
      },
      debug(object, gui) {
        const moonFolder = gui.addFolder("Moon");
        moonFolder.add(object, "intensity", 0, 1, 0.001);
        moonFolder.add(object.position, "x", -5, 5, 0.001);
        moonFolder.add(object.position, "y", -5, 5, 0.001);
        moonFolder.add(object.position, "z", -5, 5, 0.001);
      },
      helper(object) {
        return new THREE.DirectionalLightHelper(object);
      },
    }
  );
  const lights = [ambientLight, moonLight];
  // Add to canvas
  canvas.addObject([...objects, ...lights]);

  return canvas;
};

const HauntedHousePage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default HauntedHousePage;
