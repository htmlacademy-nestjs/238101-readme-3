import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PublicationBaseDto {
  @ApiProperty({
    description: 'tags for video',
    example: ['cats'],
    required: false,
    isArray: true,
  })
  @IsArray()
  @ArrayMaxSize(8)
  @IsString({ each: true })
  @MinLength(3)
  @MaxLength(10)
  @IsOptional()
  tags: string[];
}

export class CreatePublicationLinkDto extends PublicationBaseDto {
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
  @IsUrl({}, { message: 'URL NOT VALID' })
  link: string;
}
