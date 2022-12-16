import DefaultObject, { Options } from "classes/common/DefaultObject";
import * as THREE from "three";

const createObject = <T extends THREE.Object3D = THREE.Object3D>(
  object: T,
  options: Options<T> = {}
) => new DefaultObject(object, options);

export default createObject;
