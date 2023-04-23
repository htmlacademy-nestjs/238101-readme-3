import { Publication } from '@prisma/client';
import { Comment, Entity } from '@project/shared/shared-types';

export class CommentEntity implements Comment, Entity<Comment> {
  id?: number;

  authorId: string;
  publicationId: Publication['id'];
  text: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment): void {
    this.id = entity.id;

    this.authorId = entity.authorId;
    this.publicationId = entity.publicationId;
    this.text = entity.text;

    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  public toObject(): Comment {
    return { ...this };
  }
}
