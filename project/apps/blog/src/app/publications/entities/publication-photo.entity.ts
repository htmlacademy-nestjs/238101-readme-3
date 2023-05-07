import {
  PublicationKind,
  PublicationPhoto,
  PublicationStatus,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationPhotoEntity implements PublicationEntity {
  public id?: number;

  public authorId: string;

  public photo: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Photo = PublicationKind.Photo;

  public publishedAt: Date;

  constructor(publication: Omit<PublicationPhoto, 'type'>) {
    this.fillEntity(publication);
  }

  fillEntity(entity: Omit<PublicationPhoto, 'type'>) {
    this.id = entity.id;

    this.authorId = entity.authorId;

    this.photo = entity.photo;
    this.status = entity.status;
    this.tags = entity.tags;

    this.publishedAt = new Date(entity.publishedAt);
  }

  public toObject(): PublicationPhoto {
    return { ...this };
  }
}
