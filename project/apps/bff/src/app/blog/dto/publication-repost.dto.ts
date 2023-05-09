import { ApiProperty } from '@nestjs/swagger';

export class BffPublcationRepost {
  @ApiProperty({
    description: 'publication id',
  })
  publicationId: number;
}
