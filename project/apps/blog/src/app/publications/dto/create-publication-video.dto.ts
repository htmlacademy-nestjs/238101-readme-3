import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationVideoDto {
  @ApiProperty({
    description: 'Video link on youtube',
    example: 'https://youtube.com',
  })
  link: string;

  @ApiProperty({
    description: 'name of publication',
    example: 'Funny video',
  })
  name: string;

  @ApiProperty({
    description: 'tags for video',
    example: ['cats'],
    required: false,
    isArray: true,
  })
  tags: string[];
}
