import {
  PublicationKind,
  PublicationQuote,
  PublicationStatus,
} from '@project/shared/shared-types';
import { PublicationEntity } from './publication.entity';

export class PublicationQuoteEntity implements PublicationEntity {
  public id?: number;

  public authorQuote: string;
  public content: string;
  public status: PublicationStatus;
  public tags?: string[];
  public type: PublicationKind.Quote = PublicationKind.Quote;

  public createdAt: string;
  public updatedAt: string;

  constructor(publication: PublicationQuote) {
    this.fillEntity(publication);
  }

  fillEntity(entity: PublicationQuote) {
    this.id = entity.id;

    this.authorQuote = entity.authorQuote;
    this.content = entity.content;
    this.status = entity.status;
    this.tags = entity.tags;

    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  public toObject(): PublicationQuote {
    return { ...this };
  }
}
