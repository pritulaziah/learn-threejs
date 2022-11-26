import { IDefaultGeometry, IDefaultMaterial } from "types/objects";
import DefaultObject, { Options } from "classes/common/DefaultObject";
import * as THREE from "three";

export const createObject = (object: THREE.Object3D, options: Options = {}) =>
  new DefaultObject(object, options);

export const createObjectFunc =
  (
    material: IDefaultMaterial,
    geometry: IDefaultGeometry,
    initOptions?: Options
  ) =>
  (options?: Options) =>
    createObject(new THREE.Mesh(geometry, material), options || initOptions);
