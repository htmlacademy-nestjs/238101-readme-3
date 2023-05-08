import { IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  PublicationQueryDefaultSettings,
  PublicationSortKind,
  Sorting,
} from './publication.const';
import { ApiProperty } from '@nestjs/swagger';
import { PublicationKind } from '@project/shared/shared-types';

export class PublicationQuery {
  @ApiProperty({
    required: false,
    default: PublicationQueryDefaultSettings.CountLimit,
  })
  @IsNumber()
  @IsOptional()
  @Transform(
    ({ value }) => Number(value) || PublicationQueryDefaultSettings.CountLimit
  )
  public limit?: number;

  @ApiProperty({
    required: false,
    enum: Sorting,
    default: Sorting.Desc,
  })
  @IsEnum(Sorting)
  @Transform(({ value }) => value || Sorting.Desc)
  @IsOptional()
  public sortKind?: Sorting;

  @ApiProperty({
    required: false,
    enum: PublicationSortKind,
    default: PublicationSortKind.PublishedDate,
  })
  @IsEnum(PublicationSortKind)
  @Transform(({ value }) => value || PublicationSortKind.PublishedDate)
  @IsOptional()
  public sortingBy?: PublicationSortKind;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page?: number;

  @ApiProperty({
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  public authorId?: string;

  @ApiProperty({
    required: false,
    enum: PublicationKind,
    default: null,
  })
  public publicationKind?: PublicationKind;

  @ApiProperty({
    required: false,
  })
  tag?: string;
}
