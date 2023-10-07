import DefaultCanvas from "./common/DefaultCanvas";
import * as THREE from "three";
import { World } from "cannon-es";

class PhysicsCanvas extends DefaultCanvas {
  word: World;
  _oldElapsedTime: number;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.word = new World();
    this._oldElapsedTime = 0;
  }

  get oldElapsedTime() {
    return this._oldElapsedTime;
  }

  set oldElapsedTime(elapsedTime) {
    this._oldElapsedTime = elapsedTime;
  }

  run() {
    // this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    super.run();
  }
}

export default PhysicsCanvas;
