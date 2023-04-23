import { Entity, Like } from '@project/shared/shared-types';

export class LikeEntity implements Like, Entity<Like> {
  public id?: number;
  public authorId: string;
  public publicationId: number;
  public createdAt?: Date;

  constructor(like: Like) {
    this.fillEntity(like);
  }

  public fillEntity(entity: Like): void {
    this.id = entity.id;
    this.authorId = entity.authorId;
    this.publicationId = entity.publicationId;
    this.createdAt = entity.createdAt;
  }

  public toObject(): Like {
    return { ...this };
  }
}
