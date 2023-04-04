import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationTextDto {
  @ApiProperty({
    description: 'announcement',
  })
  announcement: string;

  @ApiProperty({
    description: 'Text content',
  })
  content: string;

  @ApiProperty({
    description: 'name of publication',
  })
  name: string;

  @ApiProperty({
    description: 'tags for Text',
    example: ['science'],
    required: false,
    isArray: true,
  })
  tags: string[];
}
