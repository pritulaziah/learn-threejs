import { GUI } from "dat.gui";
import { IDefaultObject } from "types/objects";

export interface Options<T> {
  draw?: (object: T) => void;
  update?: (object: T, delta: number) => void;
  debug?: (object: T, gui: GUI) => void;
  helper?: (object: T) => THREE.Object3D;
}

class Default3DObject<T extends THREE.Object3D = THREE.Object3D>
  implements IDefaultObject<T>
{
  object: T;
  options: Options<T>;

  constructor(object: T, options: Options<T> = {}) {
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

  helper() {
    return this.options?.helper?.(this.object);
  }
}

export default Default3DObject;
