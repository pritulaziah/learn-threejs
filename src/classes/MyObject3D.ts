import * as THREE from "three";

export type MyMaterials =
  | THREE.MeshLambertMaterial
  | THREE.MeshBasicMaterial
  | THREE.MeshDepthMaterial
  | THREE.MeshPhongMaterial
  | THREE.MeshToonMaterial
  | THREE.MeshNormalMaterial
  | THREE.MeshMatcapMaterial;

class MyObject3D {
  object: THREE.Mesh<THREE.BufferGeometry, MyMaterials>;

  constructor(geometry: THREE.BufferGeometry, material: MyMaterials) {
    const object = new THREE.Mesh(geometry, material);
    this.object = object;
  }

  applyMaterialOptions() {}

  get material() {
    return this.object.material;
  }

  set material(material) {
    this.object.material = material;
    this.applyMaterialOptions();
  }

  update(_delta: number) {}

  draw() {}
}

export default MyObject3D;
