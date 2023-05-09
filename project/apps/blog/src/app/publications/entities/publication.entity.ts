import {
  Entity,
  PublicationStatus,
  Publication,
  PublicationKind,
} from '@project/shared/shared-types';

export type PublicationEntityConstructor<TPublicationEntity> = Omit<
  TPublicationEntity,
  'type'
>;

export class PublicationEntity implements Publication, Entity<Publication> {
  public id?: number;
  public authorId: string;

  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind;

  public originalAuthorId?: string;
  public originalPublicationId?: number;
  public isReposted?: boolean;

  public createdAt?: Date;
  public publishedAt: Date;
  public updatedAt?: Date;

  constructor(publication: PublicationEntityConstructor<Publication>) {
    this.fillEntity(publication);
  }

  fillEntity(entity: Omit<Publication, 'type'>): void {
    this.id = entity.id;
    this.authorId = entity.authorId;

    this.status = entity.status;
    this.tags = entity.tags;

    this.originalAuthorId = entity.originalAuthorId;
    this.originalPublicationId = entity.originalPublicationId;
    this.isReposted = entity.isReposted;

    this.createdAt = entity.createdAt;
    this.publishedAt = entity.publishedAt
      ? new Date(entity.publishedAt)
      : new Date();
    this.updatedAt = entity.updatedAt;
  }

  toObject(): Publication {
    return { ...this };
  }
}
