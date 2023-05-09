import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PublicationTextRdo } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';
import { BffPublicationAuthorRdo } from './publication-author.rdo';

export class BffPublicationTextRdo extends OmitType(PublicationTextRdo, [
  'authorId',
]) {}

export class BffPublicationTextFullInfoRdo extends OmitType(
  PublicationTextRdo,
  ['authorId']
) {
  @ApiProperty()
  @Expose()
  user: BffPublicationAuthorRdo;
}
