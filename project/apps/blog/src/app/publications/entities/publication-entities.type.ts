import { PublicationLinkEntity } from './publication-link.entity';
import { PublicationPhotoEntity } from './publication-photo.entity';
import { PublicationQuoteEntity } from './publication-quote.entity';
import { PublicationTextEntity } from './publication-text.entity';
import { PublicationVideoEntity } from './publication-video.entity';

export type PublicationEntities =
  | PublicationLinkEntity
  | PublicationPhotoEntity
  | PublicationQuoteEntity
  | PublicationTextEntity
  | PublicationVideoEntity;
