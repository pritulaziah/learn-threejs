import * as THREE from "three";

export type DefaultMaterials =
  | THREE.MeshLambertMaterial
  | THREE.MeshBasicMaterial
  | THREE.MeshDepthMaterial
  | THREE.MeshPhongMaterial
  | THREE.MeshToonMaterial
  | THREE.MeshNormalMaterial
  | THREE.MeshMatcapMaterial;

class DefaultObject3D {
  object: THREE.Mesh<THREE.BufferGeometry, DefaultMaterials>;

  constructor(geometry: THREE.BufferGeometry, material: DefaultMaterials) {
    this.object = new THREE.Mesh(geometry, material);
  }

  update(_delta: number) {}

  draw() {}
}

export default DefaultObject3D;
