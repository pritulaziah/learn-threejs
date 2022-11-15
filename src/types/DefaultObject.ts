import * as THREE from "three";

interface DefaultObject {
  object: THREE.Object3D<THREE.Event>;

  update(_delta: number): void;
  draw(): void;
}

export default DefaultObject;
