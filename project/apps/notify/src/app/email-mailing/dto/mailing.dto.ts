import { ApiProperty } from '@nestjs/swagger';
import { Publications, User } from '@project/shared/shared-types';

export class MailingDto {
  @ApiProperty()
  publications: Publications[];

  @ApiProperty()
  users: User[];
}
