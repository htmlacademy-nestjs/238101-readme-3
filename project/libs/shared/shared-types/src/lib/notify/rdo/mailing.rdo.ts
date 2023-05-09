import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MailingRdo {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  mailingDate: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Expose()
  updatedAt: string;
}
