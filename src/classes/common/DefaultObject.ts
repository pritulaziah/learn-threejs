import { GUI } from "dat.gui";
import { Object3D } from "three";
import { IDefault3DObject, IDefaultObject } from "types/objects";

export interface Options {
  draw?: (object: Object3D) => void;
  update?: (object: Object3D, delta: number) => void;
  debug?: (object: Object3D, gui: GUI) => void;
}

class Default3DObject implements IDefaultObject {
  object: IDefault3DObject;
  options: Options;

  constructor(object: IDefault3DObject, options: Options = {}) {
    this.object = object;
    this.options = options;
  }

  draw() {
    this.options?.draw?.(this.object);
  }

  update(delta: number) {
    this.options?.update?.(this.object, delta);
  }

  debug(gui: GUI) {
    this.options?.debug?.(this.object, gui);
  }
}

export default Default3DObject;
