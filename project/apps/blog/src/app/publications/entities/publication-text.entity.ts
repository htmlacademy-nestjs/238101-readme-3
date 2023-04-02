import {
  PublicationKind,
  PublicationStatus,
  PublicationText,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationTextEntity implements PublicationEntity {
  public _id?: string;

  public announcement: string;
  public content: string;
  public name: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Text = PublicationKind.Text;

  public createdAt: string;
  public updatedAt: string;

  constructor(publication: PublicationText) {
    this.fillEntity(publication);
  }

  fillEntity(entity: PublicationText) {
    this._id = entity._id;

    this.announcement = entity.announcement;
    this.content = entity.content;
    this.name = entity.name;
    this.status = entity.status;
    this.tags = entity.tags;

    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  public toObject(): PublicationText {
    return { ...this };
  }
}
