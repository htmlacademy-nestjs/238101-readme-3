import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PublicationLinkRdo } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';
import { BffPublicationAuthorRdo } from './publication-author.rdo';

export class BffPublicationLinkRdo extends OmitType(PublicationLinkRdo, [
  'authorId',
]) {}

export class BffPublicationLinkFullInfoRdo extends OmitType(
  PublicationLinkRdo,
  ['authorId']
) {
  @ApiProperty()
  @Expose()
  user: BffPublicationAuthorRdo;
}
