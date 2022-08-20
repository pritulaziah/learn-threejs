import * as THREE from "three";
import My3DObject from "./My3DObject";

class Sphere extends My3DObject {
  constructor(material: THREE.MeshBasicMaterial) {
    super(material, new THREE.SphereBufferGeometry(0.5, 16, 16));
    this.object.position.x = -1.5;
  }

  draw(delta: number) {
    this.object.rotation.x = delta * 0.3;
    this.object.rotation.y = delta * 0.3;
  }
}

export default Sphere;
