import * as THREE from "three";
import DefaultObject from "../types/DefaultObject";
import getRandomArbitrary from "../utils/getRandomArbitrary";

class Donut implements DefaultObject {
  object: THREE.Mesh<THREE.BufferGeometry, THREE.MeshMatcapMaterial>;

  constructor() {
    const geometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    const matcapTexture = new THREE.TextureLoader().load("assets/1.png");
    const material = new THREE.MeshMatcapMaterial({ map: matcapTexture });
    this.object = new THREE.Mesh(geometry, material);
  }

  draw() {
    this.object.position.x = getRandomArbitrary(-5, 5);
    this.object.position.y = getRandomArbitrary(-5, 5);
    this.object.position.z = getRandomArbitrary(-5, 5);
    this.object.rotation.x = getRandomArbitrary(0, Math.PI);
    this.object.rotation.y = getRandomArbitrary(0, Math.PI);

    const scale = Math.random();
    this.object.scale.set(scale, scale, scale);
  }

  update(delta: number) {}
}

export default Donut;
