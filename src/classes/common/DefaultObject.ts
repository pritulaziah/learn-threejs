import * as THREE from "three";
import {
  IDefaultGeometry,
  IDefaultMaterial,
  IDefault3DObject,
  IDefaultObject,
} from "../../types/DefaultObject";

export interface Options {
  draw?: (object: IDefault3DObject) => void;
  update?: (object: IDefault3DObject, delta: number) => void;
}

class Default3DObject implements IDefaultObject {
  object: IDefault3DObject;
  options: Options;

  constructor(
    geometry: IDefaultGeometry,
    material: IDefaultMaterial,
    options: Options = {}
  ) {
    this.object = new THREE.Mesh(geometry, material);
    this.options = options;
  }

  draw() {
    this.options?.draw?.(this.object);
  }

  update(delta: number) {
    this.options?.update?.(this.object, delta);
  }
}

export default Default3DObject;
