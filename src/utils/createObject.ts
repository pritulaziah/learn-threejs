import { IDefaultGeometry, IDefaultMaterial } from "types/objects";
import DefaultObject, { Options } from "classes/common/DefaultObject";
import * as THREE from "three";

const createObject = <T extends THREE.Object3D = THREE.Object3D>(
  object: T,
  options: Options<T> = {}
) => new DefaultObject(object, options);

export default createObject;

export const createObjectFunc =
  (
    material: IDefaultMaterial,
    geometry: IDefaultGeometry,
    initOptions?: Options<THREE.Object3D>
  ) =>
  (options?: Options<THREE.Object3D>) => {
    const mesh = new THREE.Mesh(geometry, material);
    return createObject(mesh, options || initOptions);
  };
