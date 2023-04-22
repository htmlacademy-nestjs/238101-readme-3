import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateCommentRdo {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({
    minLength: 10,
    maxLength: 100,
    required: true,
    description: 'comment message',
    example: 'Example comment message',
  })
  @Expose()
  text: string;

  @ApiProperty({
    required: true,
    description: 'publication id',
    example: '1',
  })
  @Expose()
  publicationId: number;
}
