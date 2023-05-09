import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DeleteCommentRdo {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  message: string;
}
