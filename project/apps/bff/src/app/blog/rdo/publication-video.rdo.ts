import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PublicationVideoRdo } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';
import { BffPublicationAuthorRdo } from './publication-author.rdo';

export class BffPublicationVideoRdo extends OmitType(PublicationVideoRdo, [
  'authorId',
]) {}

export class BffPublicationVideoFullInfoRdo extends OmitType(
  PublicationVideoRdo,
  ['authorId']
) {
  @ApiProperty()
  @Expose()
  user: BffPublicationAuthorRdo;
}
