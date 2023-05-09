import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import {
  CreatePublicationBaseDto,
  PublicationBaseDto,
} from './publication-base.dto';

class PublicationBaseVideoDto {
  @ApiProperty({
    description: 'Video link on youtube',
    example: 'https://youtube.com',
  })
  @IsUrl({ host_whitelist: ['youtube.com'] })
  link: string;

  @ApiProperty({
    description: 'name of publication',
    example: 'Funny video',
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  name: string;
}

export class CreatePublicationBaseVideoDto extends IntersectionType(
  PublicationBaseVideoDto,
  CreatePublicationBaseDto
) {}

export class UpdatePublicationBaseVideoDto extends PartialType(
  IntersectionType(PublicationBaseVideoDto, PublicationBaseDto)
) {}
