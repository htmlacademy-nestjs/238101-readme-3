import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationLinkDto {
  @ApiProperty({
    description: 'name of publication',
    example: 'important link',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'link to something',
    example: 'https://google.com',
  })
  link: string;

  @ApiProperty({
    description: 'tags for link',
    example: ['google'],
    required: false,
    isArray: true,
  })
  tags: string[];
}
