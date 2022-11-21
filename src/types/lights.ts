import * as THREE from "three";

export type IDefaultLights =
  | THREE.AmbientLight
  | THREE.PointLight
  | THREE.DirectionalLight
  | THREE.HemisphereLight
  | THREE.RectAreaLight;
