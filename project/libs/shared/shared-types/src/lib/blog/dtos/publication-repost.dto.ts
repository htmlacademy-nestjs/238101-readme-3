import { ApiProperty } from '@nestjs/swagger';

export class PublicationRepostDto {
  @ApiProperty({
    description: 'publication id',
  })
  publicationId: number;

  userId: string;
}
