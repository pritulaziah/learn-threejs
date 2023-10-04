import DefaultCanvas from "./common/DefaultCanvas";
import * as THREE from "three";

class PhysicsCanvas extends DefaultCanvas {
  run() {
    // this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    super.run();
  }
}

export default PhysicsCanvas;
