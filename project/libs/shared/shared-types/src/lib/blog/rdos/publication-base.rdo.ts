import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Like } from '../../like.interface';
import { Comment } from '../../comment.interface';

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

  @ApiProperty({})
  @Expose()
  likes: Like[];

  @ApiProperty({})
  @Expose()
  comments: Comment[];

  @ApiProperty({})
  @Expose()
  isReposted: boolean;

  @ApiProperty({})
  @Expose()
  originalAuthorId: string;
}
