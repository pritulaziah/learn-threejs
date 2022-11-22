import * as THREE from "three";

export type ILights =
  | THREE.AmbientLight
  | THREE.PointLight
  | THREE.DirectionalLight
  | THREE.HemisphereLight
  | THREE.RectAreaLight
  | THREE.SpotLight;
