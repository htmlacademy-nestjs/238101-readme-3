export interface Entity<TEntityBase> {
  toObject(): TEntityBase;
  fillEntity(entity: TEntityBase): void;
}
