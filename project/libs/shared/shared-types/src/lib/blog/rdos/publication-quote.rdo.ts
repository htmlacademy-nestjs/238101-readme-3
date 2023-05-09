import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PublicationKind, PublicationStatus } from '../../publication';
import { PublicationBaseRdo } from './publication-base.rdo';

export class PublicationQuoteRdo extends PublicationBaseRdo {
  @ApiProperty({
    description: 'quote publication id',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Author of quote',
    example: 'Walter White',
  })
  @Expose()
  authorQuote: string;

  @ApiProperty({
    description: 'Quote content',
    example: 'Say my name.',
  })
  @Expose()
  content: string;

  @ApiProperty({
    enum: PublicationStatus,
  })
  @Expose()
  status: PublicationStatus;

  @ApiProperty({
    description: 'tags for video',
    example: ['breaking', 'bad'],
    isArray: true,
  })
  @Expose()
  tags: string[];

  @ApiProperty({
    default: PublicationKind.Quote,
    enum: PublicationKind,
  })
  @Expose()
  type: PublicationKind.Quote;
}
