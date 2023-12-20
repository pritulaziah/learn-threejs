import * as CANNON from "cannon-es";
import DefaultCanvas, { DefaultCanvasOptions } from "classes/common/DefaultCanvas";
import PhysicObject from "classes/common/PhysicEntity";

class PhysicsCanvas extends DefaultCanvas {
  public word: CANNON.World;

  override entities: PhysicObject[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    options?: DefaultCanvasOptions,
    wordOptions?: CANNON.WorldOptions
  ) {
    super(canvas, options);
    this.word = new CANNON.World(wordOptions);
  }

  private _oldElapsedTime = 0;

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

  protected addEntitiesToScene() {
    for (const element of this.entities) {
      element.addToWorld(this.word);
      element.addToScene(this.scene);
    }
  }
}

export default PhysicsCanvas;
