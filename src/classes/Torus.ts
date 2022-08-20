import * as THREE from "three";
import My3DObject from "./My3DObject";

class Torus extends My3DObject {
  constructor(material: THREE.MeshBasicMaterial) {
    super(material, new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32));
    this.object.position.x = 1.5;
  }

  draw(delta: number) {
    this.object.rotation.x = delta * 0.3;
    this.object.rotation.y = delta * 0.3;
  }
}

export default Torus;
