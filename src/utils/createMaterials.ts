import * as THREE from "three";

export const createMeshStandardMaterial = (
  options?: THREE.MeshStandardMaterialParameters
) => {
  const material = new THREE.MeshStandardMaterial(options);
  return material;
};
