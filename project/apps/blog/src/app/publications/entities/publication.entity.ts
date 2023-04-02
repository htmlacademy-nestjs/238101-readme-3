import {
  Entity,
  PublicationStatus,
  Publication,
  PublicationKind,
} from '@project/shared/shared-types';

export abstract class PublicationEntity
  implements Publication, Entity<Publication>
{
  public _id?: string;

  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind;

  public createdAt: string;
  public updatedAt: string;

  constructor(publication: Publication) {
    this.fillEntity(publication);
  }

  abstract fillEntity(entity: Publication): void;

  abstract toObject(): Publication;
}
