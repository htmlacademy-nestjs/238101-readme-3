import { ApiProperty } from '@nestjs/swagger';
import { Publications, UserRdo } from '@project/shared/shared-types';

export class MailingDto {
  @ApiProperty()
  publications: Publications[];

  @ApiProperty()
  users: UserRdo[];
}
