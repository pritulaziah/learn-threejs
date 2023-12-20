import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import * as THREE from "three";
// import UpdateObject from "classes/common/UpdateObject";
import DefaultCanvas from "classes/common/DefaultCanvas";

const WORLD_SIZE = 20;
const HOUSE_HEIGHT = 2.5;
const HOUSE_WIDTH = 4;
const ROOF_HEIGHT = 1;
const DOOR_HEIGHT = 2.2;
const DOOR_WIDTH = 2.2;
const GRAVE_WIDTH = 0.6;
const GRAVE_HEIGHT = 0.8;
const FOG_COLOR = "#262837";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const textureLoader = new THREE.TextureLoader();
  const canvas = new DefaultCanvas(canvasElement, {
    cameraPositon: { x: 4, y: 2, z: 5 },
  });
  canvas.scene.fog = new THREE.Fog(FOG_COLOR, 1, 15);
  canvas.renderer.setClearColor(FOG_COLOR);
  canvas.renderer.shadowMap.enabled = true;
  canvas.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  Promise.all([
    textureLoader.loadAsync("assets/textures/door/color.jpg"),
    textureLoader.loadAsync("assets/textures/door/alpha.jpg"),
    textureLoader.loadAsync("assets/textures/door/ambientOcclusion.jpg"),
    textureLoader.loadAsync("assets/textures/door/height.jpg"),
    textureLoader.loadAsync("assets/textures/door/normal.jpg"),
    textureLoader.loadAsync("assets/textures/door/metalness.jpg"),
    textureLoader.loadAsync("assets/textures/door/roughness.jpg"),
    textureLoader.loadAsync("assets/textures/bricks/color.jpg"),
    textureLoader.loadAsync("assets/textures/bricks/ambientOcclusion.jpg"),
    textureLoader.loadAsync("assets/textures/bricks/normal.jpg"),
    textureLoader.loadAsync("assets/textures/bricks/roughness.jpg"),
    textureLoader.loadAsync("assets/textures/grass/color.jpg"),
    textureLoader.loadAsync("assets/textures/grass/ambientOcclusion.jpg"),
    textureLoader.loadAsync("assets/textures/grass/normal.jpg"),
    textureLoader.loadAsync("assets/textures/grass/roughness.jpg"),
  ]).then((textures) => {
    const [
      doorColorTexture,
      doorAlphaTexture,
      doorAmbientOcclussionTexture,
      doorHeightTexture,
      doorNormalTexture,
      doorMetalnessTexture,
      doorRoughnessTexture,
      bricksColorTexture,
      bricksAmbientOcclusionTexture,
      bricksNormalTexture,
      bricksRoughnessTexture,
      grassColorTexture,
      grassAmbientOcclusionTexture,
      grassNormalTexture,
      grassRoughnessTexture,
    ] = textures;
    // const house = new THREE.Group();
    // Floor
    const floorTextures = [
      grassColorTexture,
      grassAmbientOcclusionTexture,
      grassNormalTexture,
      grassRoughnessTexture,
    ];

    for (const floorTexture of floorTextures) {
      floorTexture.repeat.set(8, 8);
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
    }

    // const floor = new UpdateObject(
    //   new THREE.Mesh(
    //     new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE),
    //     new THREE.MeshStandardMaterial({
    //       map: grassColorTexture,
    //       aoMap: grassAmbientOcclusionTexture,
    //       normalMap: grassNormalTexture,
    //       roughnessMap: grassRoughnessTexture,
    //       side: THREE.DoubleSide,
    //     })
    //   ),
    //   {
    //     draw(object) {
    //       object.receiveShadow = true;
    //       object.geometry.attributes.uv2 = new THREE.Float32BufferAttribute(
    //         (
    //           object.geometry.attributes.uv as THREE.Float32BufferAttribute
    //         ).array,
    //         2
    //       );
    //       object.rotation.x = -Math.PI * 0.5;
    //       object.position.y = 0;
    //     },
    //   }
    // );
    // Walls
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(HOUSE_WIDTH, HOUSE_HEIGHT, HOUSE_WIDTH),
      new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
      })
    );
    walls.castShadow = true;
    walls.geometry.attributes.uv2 = new THREE.Float32BufferAttribute(
      (walls.geometry.attributes.uv as THREE.Float32BufferAttribute).array,
      2
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
      new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_HEIGHT, 100, 100),
      new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        aoMap: doorAmbientOcclussionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
      })
    );

    door.geometry.attributes.uv2 = new THREE.Float32BufferAttribute(
      (door.geometry.attributes.uv as THREE.Float32BufferAttribute).array,
      2
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
    bush1.castShadow = true;
    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush2.scale.set(0.25, 0.25, 0.25);
    bush2.position.set(1.4, 0.1, 2.1);
    bush2.castShadow = true;
    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush3.scale.set(0.4, 0.4, 0.4);
    bush3.position.set(-0.8, 0.1, 2.2);
    bush3.castShadow = true;
    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush4.scale.set(0.15, 0.15, 0.15);
    bush4.position.set(-1, 0.05, 2.6);
    bush4.castShadow = true;
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
      grave.castShadow = true;
      graves.add(grave);
    }
    // Door light
    const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
    doorLight.position.set(0, 2.2, 2.7);
    doorLight.castShadow = true;
    doorLight.shadow.mapSize.width = 256;
    doorLight.shadow.mapSize.height = 256;
    doorLight.shadow.camera.far = 7;
    // Ghosts
    // function drawGhost(object: THREE.PointLight) {
    //   object.castShadow = true;
    //   object.shadow.mapSize.width = 256;
    //   object.shadow.mapSize.height = 256;
    // }
    // const light = new THREE.PointLight("#ffffff", 2, 3);
    // const ghost1 = new UpdateObject(light.clone(), {
    //   draw: drawGhost,
    //   update(object, delta) {
    //     const angle = delta * 0.5;
    //     object.position.x = Math.cos(angle) * 4;
    //     object.position.y = Math.sin(delta * 3);
    //     object.position.z = Math.sin(angle) * 4;
    //   },
    // });
    // const ghost2 = new UpdateObject(light.clone(), {
    //   draw: drawGhost,
    //   update(object, delta) {
    //     const angle = delta * -0.32;
    //     object.position.x = Math.cos(angle) * 5;
    //     object.position.y = Math.sin(delta * 4) + Math.sin(delta * 2.5);
    //     object.position.z = Math.sin(angle) * 5;
    //   },
    // });
    // const ghost3 = new UpdateObject(light.clone(), {
    //   draw: drawGhost,
    //   update(object, delta) {
    //     const angle = delta * 0.18;
    //     object.position.x = Math.cos(angle) * (7 + Math.sin(delta * 0.32));
    //     object.position.y = Math.sin(delta * 5) + Math.sin(delta * 2);
    //     object.position.z = Math.sin(angle) * (7 + Math.sin(delta * 2.5));
    //   },
    // });
    // const ghosts = [ghost1, ghost2, ghost3];
    // Add all
    // house.add(walls, roof, door, bushes, graves, doorLight);
    // Add to canvas
    // canvas.addObject([floor, ...ghosts, new UpdateObject(house)]);
  });

  // Lights
  // const lightColor = "#b9d5ff";
  // const lightIntensity = 0.12;
  // const ambientLight = new UpdateObject(
  //   new THREE.AmbientLight(lightColor, lightIntensity),
  //   {
  //     debug(object, gui) {
  //       gui.addFolder("AmbientLight").add(object, "intensity", 0, 1, 0.001);
  //     },
  //   }
  // );
  // const moonLight = new UpdateObject(
  //   new THREE.DirectionalLight(lightColor, lightIntensity),
  //   {
  //     draw(object) {
  //       object.position.set(4, 5, -2);
  //       object.castShadow = true;
  //     },
  //     debug(object, gui) {
  //       const moonFolder = gui.addFolder("Moon");
  //       moonFolder.add(object, "intensity", 0, 1, 0.001);
  //       moonFolder.add(object.position, "x", -5, 5, 0.001);
  //       moonFolder.add(object.position, "y", -5, 5, 0.001);
  //       moonFolder.add(object.position, "z", -5, 5, 0.001);
  //     },
  //     helper(object) {
  //       return new THREE.DirectionalLightHelper(object);
  //     },
  //   }
  // );
  // canvas.addObject([ambientLight, moonLight]);

  return canvas;
};

const HauntedHousePage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default HauntedHousePage;
