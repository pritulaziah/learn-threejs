import { GUI } from "dat.gui";
import { IUpdateObject } from "types/objects";

type UpdateObjectOptions<T extends THREE.Object3D> = {
  draw?: (object: T) => void;
  update?: (object: T, delta: number) => void;
  debug?: (object: T, gui: GUI) => void;
  helper?: (object: T) => THREE.Object3D | THREE.Object3D[];
};

class UpdateObject<T extends THREE.Object3D = THREE.Object3D> implements IUpdateObject<T> {
  object: T;
  options: UpdateObjectOptions<T>;

  constructor(object: T, options: UpdateObjectOptions<T> = {}) {
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

export default UpdateObject;
