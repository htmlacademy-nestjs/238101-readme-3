import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PublicationPhotoRdo } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';
import { BffPublicationAuthorRdo } from './publication-author.rdo';

export class BffPublicationPhotoRdo extends OmitType(PublicationPhotoRdo, [
  'authorId',
]) {}

export class BffPublicationPhotoFullInfoRdo extends OmitType(
  PublicationPhotoRdo,
  ['authorId']
) {
  @ApiProperty()
  @Expose()
  user: BffPublicationAuthorRdo;
}
