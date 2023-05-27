import * as THREE from "three";

/**
 * Creates vertices for a 3D object.
 *
 * @param count - The number of vertices to create.
 * @param createCoordinate - A function that generates a random coordinate value.
 * @returns The buffer attribute containing the vertices.
 */
function createVerices(count: number, createCoordinate: () => number) {
  const vertices = [];

  for (let i = 0; i < count; i++) {
    const x = createCoordinate();
    const y = createCoordinate();
    const z = createCoordinate();
    vertices.push(x, y, z);
  }

  return new THREE.Float32BufferAttribute(vertices, 3);
}

export default createVerices;
