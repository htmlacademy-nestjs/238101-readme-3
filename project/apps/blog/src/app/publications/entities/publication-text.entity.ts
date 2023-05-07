import {
  PublicationKind,
  PublicationStatus,
  PublicationText,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationTextEntity implements PublicationEntity {
  public id?: number;

  public authorId: string;

  public announcement: string;
  public content: string;
  public name: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Text = PublicationKind.Text;

  public publishedAt: Date;

  constructor(publication: Omit<PublicationText, 'type'>) {
    this.fillEntity(publication);
  }

  fillEntity(entity: Omit<PublicationText, 'type'>) {
    this.id = entity.id;

    this.authorId = entity.authorId;

    this.announcement = entity.announcement;
    this.content = entity.content;
    this.name = entity.name;
    this.status = entity.status;
    this.tags = entity.tags;

    this.publishedAt = entity.publishedAt
      ? new Date(entity.publishedAt)
      : new Date();
  }

  public toObject(): PublicationText {
    return { ...this };
  }
}
