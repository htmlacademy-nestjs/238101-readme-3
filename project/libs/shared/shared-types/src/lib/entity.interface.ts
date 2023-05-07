export interface Entity<TEntityBase> {
  toObject();
  fillEntity(entity: TEntityBase): void;
}
