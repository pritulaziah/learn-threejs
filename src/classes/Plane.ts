import * as THREE from "three";
import My3DObject from "./My3DObject";

class Plane extends My3DObject {
  constructor(material: THREE.MeshBasicMaterial) {
    super(material, new THREE.PlaneBufferGeometry(1, 1));
    this.object.position.x = 0;
  }

  draw(delta: number) {
    this.object.rotation.x = delta * 0.3;
    this.object.rotation.y = delta * 0.3;
  }
}

export default Plane;
