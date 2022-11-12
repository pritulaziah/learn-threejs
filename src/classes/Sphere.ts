import * as THREE from "three";
import MyObject3D, { MyMaterials } from "./MyObject3D";

class Sphere extends MyObject3D {
  constructor(material: MyMaterials) {
    const geometry = new THREE.SphereBufferGeometry(0.5, 16, 16);
    super(geometry, material);
  }

  draw() {
    this.object.position.x = -1.5;
  }

  update(delta: number) {
    this.object.rotation.x = delta * 0.3;
    this.object.rotation.y = delta * 0.3;
  }
}

export default Sphere;
