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

export type IDefault3DObject = THREE.Mesh<IDefaultGeometry, IDefaultMaterial>;

export interface IDefaultObject {
  object: THREE.Mesh<IDefaultGeometry, IDefaultMaterial>;

  update(_delta: number): void;
  draw(): void;
}
