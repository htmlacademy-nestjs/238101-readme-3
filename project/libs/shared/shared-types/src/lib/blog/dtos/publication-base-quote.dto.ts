import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseDto,
  PublicationBaseDto,
} from './publication-base.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

class PublicationBaseQuoteDto {
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

export class CreatePublicationBaseQuoteDto extends IntersectionType(
  PublicationBaseQuoteDto,
  CreatePublicationBaseDto
) {}

export class UpdatePublicationBaseQuoteDto extends IntersectionType(
  PublicationBaseQuoteDto,
  PublicationBaseDto
) {}
