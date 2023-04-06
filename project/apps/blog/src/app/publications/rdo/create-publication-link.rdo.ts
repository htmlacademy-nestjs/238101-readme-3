import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  PublicationKind,
  PublicationStatus,
} from '@project/shared/shared-types';

export class CreatePublicationLinkRdo {
  @ApiProperty({
    description: 'video publication id',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'name of publication',
    example: 'important link',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'link to something',
    example: 'https://google.com',
  })
  @Expose()
  link: string;

  @ApiProperty({
    enum: PublicationStatus,
  })
  @Expose()
  status: PublicationStatus;

  @ApiProperty({
    description: 'tags for link',
    example: ['google'],
    isArray: true,
  })
  @Expose()
  tags: string[];

  @ApiProperty({
    default: PublicationKind.Link,
    enum: PublicationKind,
  })
  @Expose()
  type: PublicationKind.Link;

  @ApiProperty({
    description: 'create date',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'last update date',
  })
  @Expose()
  updatedAt: string;
}