import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRemovedRdo {
  @ApiProperty()
  @Expose()
  message: string;
}
