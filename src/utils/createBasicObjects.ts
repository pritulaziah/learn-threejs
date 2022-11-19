import { IDefaultGeometry, IDefaultMaterial } from "types/DefaultObject";
import DefaultObject, { Options } from "classes/common/DefaultObject";

export const createObject = (
  material: IDefaultMaterial,
  geometry: IDefaultGeometry,
  options: Options = {}
) => new DefaultObject(geometry, material, options);

export const createObjectFunc =
  (
    material: IDefaultMaterial,
    geometry: IDefaultGeometry,
    initOptions?: Options
  ) =>
  (options?: Options) =>
    createObject(material, geometry, options || initOptions);
