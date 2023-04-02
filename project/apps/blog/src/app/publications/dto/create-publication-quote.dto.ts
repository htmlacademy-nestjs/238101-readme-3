import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationQuoteDto {
  @ApiProperty({
    description: 'Author of quote',
    example: 'Walter White',
  })
  authorQuote: string;

  @ApiProperty({
    description: 'Quote content',
    example: 'Say my name.',
  })
  content: string;

  @ApiProperty({
    description: 'tags for video',
    example: ['breaking', 'bad'],
    required: false,
    isArray: true,
  })
  tags: string[];
}
