import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CommentQueryDefaultSettings } from './comments.conts';

export class CommentsQuery {
  @ApiProperty({
    required: false,
    default: CommentQueryDefaultSettings.CountLimit,
  })
  @IsNumber()
  @IsOptional()
  @Transform(
    ({ value }) => Number(value) || CommentQueryDefaultSettings.CountLimit
  )
  public limit?: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page?: number;
}
