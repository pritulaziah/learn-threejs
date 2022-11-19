import * as THREE from "three";
import { ColorRepresentation } from "three";

export const createAmbientLight = (
  color?: ColorRepresentation,
  intensity?: number
) => {
  const ambientLight = new THREE.AmbientLight(color, intensity);
  return ambientLight;
};
