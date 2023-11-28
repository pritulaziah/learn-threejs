import DefaultCanvas, { DefaultCanvasOptions } from "./DefaultCanvas";
import * as THREE from "three";
import * as CANNON from "cannon-es";

class PhysicsCanvas extends DefaultCanvas {
  word: CANNON.World;
  _oldElapsedTime: number;

  constructor(
    canvas: HTMLCanvasElement,
    options?: DefaultCanvasOptions,
    wordOptions?: CANNON.WorldOptions
  ) {
    super(canvas, options);
    this.word = new CANNON.World(wordOptions);
    this._oldElapsedTime = 0;
  }

  get oldElapsedTime() {
    return this._oldElapsedTime;
  }

  set oldElapsedTime(elapsedTime) {
    this._oldElapsedTime = elapsedTime;
  }

  protected customAnimate(elapsedTime: number) {
    const deltaTime = elapsedTime - this.oldElapsedTime;
    this.oldElapsedTime = elapsedTime;
    this.word.step(1 / 60, deltaTime, 3);
    // canvas.word.fixedStep();
  }

  public run() {
    // this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    super.run();
  }
}

export default PhysicsCanvas;
