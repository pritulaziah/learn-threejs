import { GUI } from "dat.gui";
import * as THREE from "three";

export interface IUpdateObject<T extends THREE.Object3D = THREE.Object3D> {
  object: T;

  draw(): void;
  update(delta: number): void;
  debug(gui: GUI): void;
  helper(): THREE.Object3D | THREE.Object3D[] | undefined | null;
}
