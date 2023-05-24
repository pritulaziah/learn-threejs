function createVerices(count: number, createCoordinate: () => number) {
  const vertices = [];

  for (let i = 0; i < count; i++) {
    const x = createCoordinate();
    const y = createCoordinate();
    const z = createCoordinate();
    vertices.push(x, y, z);
  }

  return vertices;
}

export default createVerices;
