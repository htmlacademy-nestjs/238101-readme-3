import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  PublicationKind,
  PublicationStatus,
} from '@project/shared/shared-types';
import { PublicationBaseRdo } from './publication-base.rdo';

export class PublicationPhotoRdo extends PublicationBaseRdo {
  @ApiProperty({
    description: 'photo publication id',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'photo, max 1Mb, jpg/png',
    example: 'cat.png',
  })
  @Expose()
  photo: string;

  @ApiProperty({
    enum: PublicationStatus,
  })
  @Expose()
  status: PublicationStatus;

  @ApiProperty({
    description: 'tags for Photo',
    example: ['cats'],
    required: false,
    isArray: true,
  })
  @Expose()
  tags: string[];

  @ApiProperty({
    default: PublicationKind.Photo,
    enum: PublicationKind,
  })
  @Expose()
  type: PublicationKind.Photo;
}
