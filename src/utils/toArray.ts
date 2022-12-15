const toArray = <T>(entity: T | T[]): T[] =>
  Array.isArray(entity) ? entity : [entity];

export default toArray;
