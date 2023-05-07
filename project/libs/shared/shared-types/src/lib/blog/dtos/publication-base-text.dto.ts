import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseDto,
  PublicationBaseDto,
} from './publication-base.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

class PublicationBaseTextDto {
  @ApiProperty({
    description: 'announcement',
  })
  @IsString()
  @MinLength(50)
  @MaxLength(255)
  announcement: string;

  @ApiProperty({
    description: 'Text content',
  })
  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  content: string;

  @ApiProperty({
    description: 'name of publication',
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  name: string;
}

export class CreatePublicationBaseTextDto extends IntersectionType(
  PublicationBaseTextDto,
  CreatePublicationBaseDto
) {}

export class UpdatePublicationBaseTextDto extends IntersectionType(
  PublicationBaseTextDto,
  PublicationBaseDto
) {}
