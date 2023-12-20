import * as THREE from "three";
import * as CANNON from "cannon-es";
import PhysicObject from "classes/common/PhysicEntity";

const FLOOR_ROTATION_X = -Math.PI / 2;

type Parameters = {
  envMap: THREE.MeshStandardMaterialParameters["envMap"];
};

class PhysicFloor extends PhysicObject {
  constructor(parametrs?: Parameters) {
    const { envMap } = parametrs || {};
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: floorShape,
    });
    floorBody.quaternion.setFromEuler(FLOOR_ROTATION_X, 0, 0);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#777777",
        metalness: 0.3,
        roughness: 0.4,
        envMap,
        envMapIntensity: 0.5,
        side: THREE.DoubleSide,
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = FLOOR_ROTATION_X;

    super(floor, floorBody)
  }
}

export default PhysicFloor;