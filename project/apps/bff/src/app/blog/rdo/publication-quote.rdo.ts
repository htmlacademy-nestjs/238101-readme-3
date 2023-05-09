import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PublicationQuoteRdo } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';
import { BffPublicationAuthorRdo } from './publication-author.rdo';

export class BffPublicationQuoteRdo extends OmitType(PublicationQuoteRdo, [
  'authorId',
]) {}

export class BffPublicationQuoteFullInfoRdo extends OmitType(
  PublicationQuoteRdo,
  ['authorId']
) {
  @ApiProperty()
  @Expose()
  user: BffPublicationAuthorRdo;
}
