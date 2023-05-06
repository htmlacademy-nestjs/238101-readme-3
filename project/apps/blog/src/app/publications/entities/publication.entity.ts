import {
  Entity,
  PublicationStatus,
  Publication,
  PublicationKind,
} from '@project/shared/shared-types';

export abstract class PublicationEntity
  implements Publication, Entity<Publication>
{
  public id?: number;

  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind;

  public createdAt?: Date;
  public publishedAt: Date;
  public updatedAt?: Date;

  constructor(publication: Omit<Publication, 'type'>) {
    this.fillEntity(publication);
  }

  abstract fillEntity(entity: Omit<Publication, 'type'>): void;

  abstract toObject(): Publication;
}
