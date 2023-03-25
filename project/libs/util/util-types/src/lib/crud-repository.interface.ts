export interface CRUDRepository<Entity, Id, Response> {
  findById(id: Id): Promise<Response | null>;
  create(item: Entity): Promise<Response>;
  update(id: Id, item: Entity): Promise<Response>;
  destroy(id: Id): Promise<void>;
}
