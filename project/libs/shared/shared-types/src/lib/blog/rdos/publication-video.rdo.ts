import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PublicationKind, PublicationStatus } from '../../publication';
import { PublicationBaseRdo } from './publication-base.rdo';

export class PublicationVideoRdo extends PublicationBaseRdo {
  @ApiProperty({
    description: 'video publication id',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Video link on youtube',
    example: 'https://youtube.com',
  })
  @Expose()
  link: string;

  @ApiProperty({
    description: 'name of publication',
    example: 'Funny video',
  })
  @Expose()
  name: string;

  @ApiProperty({
    enum: PublicationStatus,
  })
  @Expose()
  status: PublicationStatus;

  @ApiProperty({
    description: 'tags for video',
    example: ['cats'],
    required: false,
    isArray: true,
  })
  @Expose()
  tags: string;

  @ApiProperty({
    enum: PublicationKind,
    default: PublicationKind.Video,
  })
  @Expose()
  type: PublicationKind.Video;
}
