import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PublicationBaseDto } from './publication-base.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePublicationQuoteDto extends PublicationBaseDto {
  @ApiProperty({
    description: 'Author of quote',
    example: 'Walter White',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  authorQuote: string;

  @ApiProperty({
    description: 'Quote content',
    example: 'Say my name.',
  })
  @IsString()
  @MinLength(20)
  @MaxLength(300)
  content: string;
}

export class UpdatePublicationQuoteDto extends PartialType(
  CreatePublicationQuoteDto
) {}
