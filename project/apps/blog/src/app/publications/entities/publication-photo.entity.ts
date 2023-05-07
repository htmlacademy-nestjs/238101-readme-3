import {
  PublicationPhoto,
  PublicationKind,
} from '@project/shared/shared-types';
import {
  PublicationEntity,
  PublicationEntityConstructor,
} from './publication.entity';

export class PublicationPhotoEntity extends PublicationEntity {
  public type: (typeof PublicationKind)['Photo'] = PublicationKind.Photo;

  public photo: string;

  constructor(publication: PublicationEntityConstructor<PublicationPhoto>) {
    super(publication);
  }

  fillEntity(entity: Omit<PublicationPhoto, 'type'>) {
    super.fillEntity(entity);
    this.authorId = entity.authorId;
    this.photo = entity.photo;
  }

  public toObject(): PublicationPhoto {
    return { ...this };
  }
}
