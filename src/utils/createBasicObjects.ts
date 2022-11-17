import { IDefaultGeometry, IDefaultMaterial } from "../types/DefaultObject";
import DefaultObject, { Options } from "../classes/common/DefaultObject";
import {
  createBoxGeometry,
  createPlaneGeometry,
  createSphereGeometry,
  createTorusGeometry,
} from "./createGeometry";

type CreateObjectFromMaterial = (
  material: IDefaultMaterial
) => (options?: Options) => DefaultObject;

export const createObject = (
  material: IDefaultMaterial,
  geometry: IDefaultGeometry,
  options: Options = {}
) => new DefaultObject(geometry, material, options);

const createObjectFunc =
  (material: IDefaultMaterial, geometry: IDefaultGeometry) =>
  (options?: Options) =>
    createObject(material, geometry, options);

export const createSphere: CreateObjectFromMaterial = (material) => {
  const geometry = createSphereGeometry();
  return createObjectFunc(material, geometry);
};

export const createCube: CreateObjectFromMaterial = (material) => {
  const geometry = createBoxGeometry();
  return createObjectFunc(material, geometry);
};

export const createTorus: CreateObjectFromMaterial = (material) => {
  const geometry = createTorusGeometry();
  return createObjectFunc(material, geometry);
};

export const createPlane: CreateObjectFromMaterial = (material) => {
  const geometry = createPlaneGeometry();
  return createObjectFunc(material, geometry);
};
