export function addIdField(entity) {
  return entity ? { ...entity, id: entity._id.toString() } : null;
}
