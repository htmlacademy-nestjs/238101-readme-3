import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  PublicationQueryDefaultSettings,
  PublicationSorting,
} from '../consts/publication.const';
import { ApiProperty } from '@nestjs/swagger';

export class PostQuery {
  @ApiProperty({
    required: false,
    default: PublicationQueryDefaultSettings.CountLimit,
  })
  @IsNumber()
  @IsOptional()
  @Transform(
    ({ value }) => Number(value) || PublicationQueryDefaultSettings.CountLimit
  )
  public limit: number;

  @ApiProperty({
    required: false,
    enum: PublicationSorting,
    default: PublicationSorting.Desc,
  })
  @IsEnum(PublicationSorting)
  @IsOptional()
  public sortDirection: PublicationSorting;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
