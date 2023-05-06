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

  public publishedAt: Date;
  public updatedAt: Date;

  constructor(publication: Omit<PublicationQuote, 'type'>) {
    this.fillEntity(publication);
  }

  fillEntity(entity: Omit<PublicationQuote, 'type'>) {
    this.id = entity.id;

    this.authorQuote = entity.authorQuote;
    this.content = entity.content;
    this.status = entity.status;
    this.tags = entity.tags;

    this.publishedAt = new Date(entity.publishedAt);
  }

  public toObject(): PublicationQuote {
    return { ...this };
  }
}
