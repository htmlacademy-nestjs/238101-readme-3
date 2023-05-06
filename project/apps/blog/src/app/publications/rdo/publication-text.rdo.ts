import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  PublicationKind,
  PublicationStatus,
} from '@project/shared/shared-types';
import { PublicationBaseRdo } from './publication-base.rdo';

export class PublicationTextRdo extends PublicationBaseRdo {
  @ApiProperty({
    description: 'quote publication id',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'announcement',
  })
  @Expose()
  announcement: string;

  @ApiProperty({
    description: 'Text content',
  })
  @Expose()
  content: string;

  @ApiProperty({
    description: 'name of publication',
  })
  @Expose()
  name: string;

  @ApiProperty({
    enum: PublicationStatus,
  })
  @Expose()
  status: PublicationStatus;

  @ApiProperty({
    description: 'tags for Text',
    example: ['science'],
    isArray: true,
  })
  @Expose()
  tags: string[];

  @ApiProperty({
    enum: PublicationKind,
    default: PublicationKind.Text,
  })
  @Expose()
  type: PublicationKind.Text;
}
