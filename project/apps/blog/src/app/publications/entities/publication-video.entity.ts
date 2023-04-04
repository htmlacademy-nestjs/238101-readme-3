import {
  PublicationKind,
  PublicationStatus,
  PublicationVideo,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationVideoEntity implements PublicationEntity {
  public _id?: string;

  public link: string;
  public name: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Video = PublicationKind.Video;

  public createdAt: number;
  public updatedAt: number;

  constructor(publication: PublicationVideo) {
    this.fillEntity(publication);
  }

  fillEntity(entity: PublicationVideo) {
    this._id = entity._id;

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
