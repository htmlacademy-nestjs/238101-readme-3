import {
  PublicationKind,
  PublicationQuote,
} from '@project/shared/shared-types';
import {
  PublicationEntity,
  PublicationEntityConstructor,
} from './publication.entity';

export class PublicationQuoteEntity extends PublicationEntity {
  public type: (typeof PublicationKind)['Quote'] = PublicationKind.Quote;

  public authorQuote: string;
  public content: string;

  constructor(publication: PublicationEntityConstructor<PublicationQuote>) {
    super(publication);
  }

  fillEntity(entity: Omit<PublicationQuote, 'type'>) {
    super.fillEntity(entity);

    this.authorQuote = entity.authorQuote;
    this.content = entity.content;
  }

  public toObject(): PublicationQuote {
    return { ...this };
  }
}
