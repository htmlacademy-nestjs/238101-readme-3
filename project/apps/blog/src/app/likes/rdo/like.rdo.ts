import { ApiProperty } from '@nestjs/swagger';
import { Like } from '@project/shared/shared-types';

import { Expose } from 'class-transformer';

export class LikeRdo implements Like {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  authorId: string;

  @ApiProperty()
  @Expose()
  publicationId: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
