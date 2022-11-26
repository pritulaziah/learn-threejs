import { GUI } from "dat.gui";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export type IDefaultMaterial =
  | THREE.MeshLambertMaterial
  | THREE.MeshBasicMaterial
  | THREE.MeshDepthMaterial
  | THREE.MeshDepthMaterial
  | THREE.MeshPhongMaterial
  | THREE.MeshToonMaterial
  | THREE.MeshNormalMaterial
  | THREE.MeshMatcapMaterial
  | THREE.MeshStandardMaterial;

export type IDefaultGeometry =
  | THREE.BoxGeometry
  | THREE.ConeGeometry
  | THREE.RingGeometry
  | THREE.ExtrudeGeometry
  | THREE.SphereGeometry
  | THREE.TorusGeometry
  | TextGeometry
  | THREE.PlaneGeometry;

export interface IDefaultObject<T extends THREE.Object3D = THREE.Object3D> {
  object: T;

  update(_delta: number): void;
  draw(): void;
  debug(gui: GUI): void;
}
