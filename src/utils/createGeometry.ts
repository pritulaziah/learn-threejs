import * as THREE from "three";

export const createSphereGeometry = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  return geometry;
};

export const createBoxGeometry = () => {
  const geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);
  return geometry;
};

export const createTorusGeometry = () => {
  const geometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);
  return geometry;
};

export const createPlaneGeometry = () => {
  const geometry = new THREE.PlaneGeometry(5, 5);
  return geometry;
};
