import * as THREE from "three";
import DefaultObject from "../types/DefaultObject";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font } from "three/examples/jsm/loaders/FontLoader";

class Text3D implements DefaultObject {
  object: THREE.Mesh<THREE.BufferGeometry, THREE.MeshMatcapMaterial>;

  constructor(font: Font) {
    const geometry = new TextGeometry("Hello Three.js", {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    geometry.center();
    const texture = new THREE.TextureLoader().load("assets/1.png");
    const material = new THREE.MeshMatcapMaterial({ map: texture });
    this.object = new THREE.Mesh(geometry, material);
  }

  draw() {}

  update(delta: number) {}
}

export default Text3D;
