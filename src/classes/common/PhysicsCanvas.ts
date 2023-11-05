import DefaultCanvas from "./DefaultCanvas";
import * as THREE from "three";
import { World, WorldOptions } from "cannon-es";

class PhysicsCanvas extends DefaultCanvas {
  word: World;
  _oldElapsedTime: number;

  constructor(canvas: HTMLCanvasElement, options?: WorldOptions) {
    super(canvas);
    this.word = new World(options);
    this._oldElapsedTime = 0;
  }

  get oldElapsedTime() {
    return this._oldElapsedTime;
  }

  set oldElapsedTime(elapsedTime) {
    this._oldElapsedTime = elapsedTime;
  }

  public customAnimate = (elapsedTime: number) => {
    const deltaTime = elapsedTime - this.oldElapsedTime;
    this.oldElapsedTime = elapsedTime;
    this.word.step(1 / 60, deltaTime, 3);
    // canvas.word.fixedStep();
  };

  public run() {
    // this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    super.run();
  }
}

export default PhysicsCanvas;
