function toArray<T>(entity: T | T[]): T[] {
  return Array.isArray(entity) ? entity : [entity];
}

export default toArray;
