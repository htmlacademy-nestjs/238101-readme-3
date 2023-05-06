import {
  PublicationKind,
  PublicationLink,
  PublicationStatus,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationLinkEntity implements PublicationEntity {
  public id?: number;

  public description?: string;
  public link: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Link = PublicationKind.Link;

  public publishedAt: Date;

  constructor(publication: Omit<PublicationLink, 'type'>) {
    this.fillEntity(publication);
  }

  fillEntity(entity: Omit<PublicationLink, 'type'>) {
    this.id = entity.id;

    this.description = entity.description;
    this.link = entity.link;
    this.status = entity.status;
    this.tags = entity.tags;

    this.publishedAt = new Date(entity.publishedAt);
  }

  public toObject(): PublicationLink {
    return { ...this };
  }
}
