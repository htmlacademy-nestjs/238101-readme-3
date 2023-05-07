import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PublicationLinkRdo } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';

export class BffPublicationAuthorRdo {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;
}

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
