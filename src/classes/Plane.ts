import * as THREE from "three";
import MyObject3D, { MyMaterials } from "./MyObject3D";

class Plane extends MyObject3D {
  constructor(material: MyMaterials) {
    const geometry = new THREE.PlaneBufferGeometry(1, 1);
    super(geometry, material);
    this.object.position.x = 0;
    this.object.material.side = THREE.DoubleSide;
  }

  applyMaterialOptions() {
    this.material.side = THREE.DoubleSide;
  }

  draw(delta: number) {
    this.object.rotation.x = delta * 0.3;
    this.object.rotation.y = delta * 0.3;
  }
}

export default Plane;
