import * as THREE from "three";

class My3DObject {
  object: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;

  constructor(
    material: THREE.MeshBasicMaterial,
    geometry: THREE.BufferGeometry
  ) {
    const object = new THREE.Mesh(geometry, material);
    this.object = object;
  }

  get material() {
    return this.object.material;
  }

  draw(_delta: number) {
    // nothing
  }
}

export default My3DObject;
