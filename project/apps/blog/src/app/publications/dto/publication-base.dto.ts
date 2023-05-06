import { ApiProperty } from '@nestjs/swagger';
import { PublicationStatus } from '@project/shared/shared-types';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsTagOneWord, IsTagStartsWithLetter } from '../validation';

export class PublicationBaseDto {
  // @ApiProperty({
  //   description: 'tags for video',
  //   example: ['cats'],
  //   required: false,
  //   isArray: true,
  // })
  // @IsArray()
  // @ArrayMaxSize(8)
  // @IsString({ each: true })
  // @IsOptional()
  // tags: string[];

  @ApiProperty({
    description: 'tags for video',
    example: ['cats'],
    required: false,
    isArray: true,
  })
  @IsArray()
  @ArrayMaxSize(8)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(10, { each: true })
  @IsOptional()
  @Transform(({ value }) => transformTags(value))
  @Validate(IsTagOneWord, { each: true })
  @Validate(IsTagStartsWithLetter, { each: true })
  tags: string[];

  @ApiProperty({
    enum: PublicationStatus,
    default: PublicationStatus.Published,
    required: false,
  })
  status: PublicationStatus;
}

const transformTags = (tags: string[]) => {
  const uniqueTags = Array.from(new Set<string>(tags));
  return uniqueTags.map((tag) => tag.toLowerCase());
};
