import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({
    description: "comment'/s author id",
    example: '123',
  })
  @Expose()
  authorId: string;

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
    description: 'date created',
    example: '2023-04-23T15:47:19.801Z',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    required: true,
    description: 'last update date',
    example: '2023-04-23T15:47:19.801Z',
  })
  @Expose()
  updatedAt: string;
}
