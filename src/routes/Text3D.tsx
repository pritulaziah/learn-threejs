import Canvas from "components/Canvas";
import DefaultCanvas from "classes/common/DefaultCanvas";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import getRandomArbitrary from "utils/getRandomArbitrary";
// import * as THREE from "three";
import useCanvas from "hooks/useCanvas";
// import { IUpdateObject } from "types/objects";
// import UpdateObject from "classes/common/UpdateObject";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// import getRandomDir from "utils/getRandomDir";

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new DefaultCanvas(canvasElement, { cameraPositon: { z: 3 } });
  // const ambientLight = new UpdateObject(new THREE.AmbientLight(0xffffff, 0.5));
  // const pointLight = new UpdateObject(new THREE.PointLight(0xffffff, 0.5), {
  //   draw: (object) => {
  //     object.position.set(2, 3, 4);
  //   },
  // });
  // canvas.addObject([ambientLight, pointLight]);

  // Promise.all([
  //   new FontLoader().loadAsync("fonts/helvetiker_bold.typeface.json"),
  //   new THREE.TextureLoader().loadAsync("assets/1.png"),
  // ]).then(([font, matcapTexture]) => {
  //   const material = new THREE.MeshStandardMaterial({ map: matcapTexture });
  //   const textGeometry = new TextGeometry("Hello Three.js", {
  //     font,
  //     size: 0.5,
  //     height: 0.2,
  //     curveSegments: 12,
  //     bevelEnabled: true,
  //     bevelThickness: 0.03,
  //     bevelSize: 0.02,
  //     bevelOffset: 0,
  //     bevelSegments: 5,
  //   });
  //   textGeometry.center();
  //   const text3D = new UpdateObject(new THREE.Mesh(textGeometry, material));
  //   const objects: IUpdateObject[] = [text3D];
  //   const geometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  //   for (let i = 0; i < 100; i++) {
  //     const rotationX = getRandomArbitrary(0, Math.PI);
  //     const rotationY = getRandomArbitrary(0, Math.PI);
  //     const speed = getRandomArbitrary(Number.MIN_VALUE, 0.2);
  //     const dir = getRandomDir();

  //     const donut = new UpdateObject(new THREE.Mesh(geometry, material), {
  //       update(object, delta) {
  //         object.rotation.x = rotationX * speed * delta * dir;
  //         object.rotation.y = rotationY * speed * delta * dir;
  //       },
  //       draw(object) {
  //         object.position.x = getRandomArbitrary(-5, 5);
  //         object.position.y = getRandomArbitrary(-5, 5);
  //         object.position.z = getRandomArbitrary(-5, 5);
  //         object.rotation.x = rotationX;
  //         object.rotation.y = rotationY;

  //         const scale = Math.random();
  //         object.scale.set(scale, scale, scale);
  //       },
  //     });
  //     objects.push(donut);
  //   }

  //   canvas.addObject(objects);
  // });

  return canvas;
};

const Text3DPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default Text3DPage;
