/**
 * Marks a THREE.Material object as needing an update.
 *
 * @param material - The material to be updated.
 */
function needUpdateMaterial(material: THREE.Material) {
  material.needsUpdate = true;
}

export default needUpdateMaterial;
