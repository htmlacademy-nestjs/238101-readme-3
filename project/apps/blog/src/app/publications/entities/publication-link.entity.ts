import {
  PublicationKind,
  PublicationLink,
  PublicationStatus,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationLinkEntity implements PublicationEntity {
  public _id?: string;

  public description?: string;
  public link: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Link = PublicationKind.Link;

  public createdAt: number;
  public updatedAt: number;

  constructor(publication: PublicationLink) {
    this.fillEntity(publication);
  }

  fillEntity(entity: PublicationLink) {
    this._id = entity._id;

    this.description = entity.description;
    this.link = entity.link;
    this.status = entity.status;
    this.tags = entity.tags;

    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  public toObject(): PublicationLink {
    return { ...this };
  }
}
