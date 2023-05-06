import {
  PublicationKind,
  PublicationStatus,
  PublicationVideo,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationVideoEntity implements PublicationEntity {
  public id?: number;

  public link: string;
  public name: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Video = PublicationKind.Video;

  public createdAt: Date;
  public updatedAt: Date;

  constructor(publication: Omit<PublicationVideo, 'type'>) {
    this.fillEntity(publication);
  }

  fillEntity(entity: Omit<PublicationVideo, 'type'>) {
    this.id = entity.id;

    this.link = entity.link;
    this.name = entity.name;
    this.status = entity.status;
    this.tags = entity.tags;

    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  public toObject(): PublicationVideo {
    return { ...this };
  }
}
