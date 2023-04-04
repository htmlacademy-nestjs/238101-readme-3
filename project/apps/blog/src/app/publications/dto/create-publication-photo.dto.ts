import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationPhotoDto {
  @ApiProperty({
    description: 'photo, max 1Mb, jpg/png',
    example: 'cat.png',
  })
  photo: string;

  @ApiProperty({
    description: 'tags for Photo',
    example: ['cats'],
    required: false,
    isArray: true,
  })
  tags: string[];
}
