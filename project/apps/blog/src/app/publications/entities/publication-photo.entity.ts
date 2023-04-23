import {
  PublicationKind,
  PublicationPhoto,
  PublicationStatus,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationPhotoEntity implements PublicationEntity {
  public id?: number;

  public photo: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Photo = PublicationKind.Photo;

  public createdAt: string;
  public updatedAt: string;

  constructor(publication: PublicationPhoto) {
    this.fillEntity(publication);
  }

  fillEntity(entity: PublicationPhoto) {
    this.id = entity.id;

    this.photo = entity.photo;
    this.status = entity.status;
    this.tags = entity.tags;

    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  public toObject(): PublicationPhoto {
    return { ...this };
  }
}
