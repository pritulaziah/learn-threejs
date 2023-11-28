import * as CANNON from "cannon-es";
import UpdateObject from "./UpdateObject";

type PhysicUpdateObjectOptions<T extends THREE.Object3D> = {
  draw?: (object: T, body: CANNON.Body) => void;
  update?: (object: T, body: CANNON.Body, delta: number) => void;
};

class PhysicUpdateObject<T extends THREE.Object3D = THREE.Object3D> extends UpdateObject<T> {
  body: CANNON.Body;
  physicOptions: PhysicUpdateObjectOptions<T>;

  constructor(
    object: T,
    body: CANNON.Body,
    options: PhysicUpdateObjectOptions<T> = {},
  ) {
    super(object);
    this.body = body;
    this.physicOptions = options;
  }
  
  draw() {
    this.physicOptions?.draw?.(this.object, this.body);
  }

  update(delta: number) {
    this.physicOptions?.update?.(this.object, this.body, delta);
  }
}

export default PhysicUpdateObject;
