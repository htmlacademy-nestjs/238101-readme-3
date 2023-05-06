import {
  PublicationKind,
  PublicationStatus,
  PublicationText,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationTextEntity implements PublicationEntity {
  public id?: number;

  public announcement: string;
  public content: string;
  public name: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Text = PublicationKind.Text;

  public createdAt: Date;
  public updatedAt: Date;

  constructor(publication: Omit<PublicationText, 'type'>) {
    this.fillEntity(publication);
  }

  fillEntity(entity: Omit<PublicationText, 'type'>) {
    this.id = entity.id;

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
