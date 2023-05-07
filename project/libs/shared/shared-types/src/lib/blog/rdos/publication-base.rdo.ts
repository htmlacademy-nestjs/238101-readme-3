import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PublicationBaseRdo {
  @ApiProperty({
    description: 'author id',
  })
  @Expose()
  authorId: string;

  @ApiProperty({
    description: 'create date',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'last update date',
  })
  @Expose()
  updatedAt: string;

  @ApiProperty({
    description: 'publication date',
  })
  @Expose()
  publishedAt: string;
}
