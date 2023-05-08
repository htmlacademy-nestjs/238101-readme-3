import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    minLength: 10,
    maxLength: 100,
    required: true,
    description: 'comment message',
    example: 'Example comment message',
  })
  text: string;

  @ApiProperty({
    required: true,
    description: 'publication id',
    example: '1',
  })
  publicationId: number;
}
