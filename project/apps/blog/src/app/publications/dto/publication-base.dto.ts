import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
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
