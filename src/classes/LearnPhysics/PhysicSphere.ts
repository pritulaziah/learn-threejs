import * as THREE from "three";
import * as CANNON from "cannon-es";
import PhysicObject from "classes/common/PhysicEntity";

type Parameters = {
  radius: number;
  position: { x?: number; y?: number; z?: number };
  envMap: THREE.MeshStandardMaterialParameters["envMap"];
};

class PhysicSphere extends PhysicObject {
  constructor(parameters: Parameters) {
    const {
      radius,
      position: { x = 0, y = 0, z = 0 },
      envMap,
    } = parameters;
    const sphereShape = new CANNON.Sphere(radius);
    const sphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(x, y, z),
      shape: sphereShape,
    });
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap,
        envMapIntensity: 0.5,
      })
    );

    sphere.castShadow = true;
    sphere.position.set(x, y, z);

    super(sphere, sphereBody);
  }
}

export default PhysicSphere;
