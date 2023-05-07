import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseDto,
  PublicationBaseDto,
} from './publication-base.dto';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

class PublicationBaseLinkDto {
  @ApiProperty({
    description: 'name of publication',
    example: 'important link',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  description: string;

  @ApiProperty({
    description: 'link to something',
    example: 'https://google.com',
  })
  @IsUrl()
  link: string;
}

export class CreatePublicationBaseLinkDto extends IntersectionType(
  PublicationBaseLinkDto,
  CreatePublicationBaseDto
) {}

export class UpdatePublicationBaseLinkDto extends PartialType(
  IntersectionType(PublicationBaseLinkDto, PublicationBaseDto)
) {}
