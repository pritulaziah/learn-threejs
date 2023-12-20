import { GUI } from "dat.gui";
import * as THREE from "three";

class Entity<T extends THREE.Object3D = THREE.Object3D> {
  object: T;

  constructor(object: T) {
    this.object = object;
  }

  draw() {}

  update(_delta: number) {}

  debug(gui: GUI) {}

  helper() {}

  addToScene(scene: THREE.Scene) {
    scene.add(this.object);
  }
}

export default Entity;
