import * as THREE from "three";
import * as CANNON from "cannon-es";
import Entity from "./Entity";

class PhysicEntity<T extends THREE.Object3D = THREE.Object3D> extends Entity {
  body: CANNON.Body;

  constructor(object: T, body: CANNON.Body) {
    super(object);
    this.body = body;
  }

  draw() {}

  update(_delta: number) {}

  addToWorld(world: CANNON.World) {
    world.addBody(this.body);
  }
}

export default PhysicEntity;
