import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseDto,
  PublicationBaseDto,
} from './publication-base.dto';
import { PartialType } from '@nestjs/mapped-types';

class PublicationBasePhotoDto {
  @ApiProperty({
    description: 'photo id',
    example: '64565883481fb09b062178a9',
  })
  photo: string;
}

export class CreatePublicationBasePhotoDto extends IntersectionType(
  PublicationBasePhotoDto,
  CreatePublicationBaseDto
) {}

export class UpdatePublicationBasePhotoDto extends PartialType(
  IntersectionType(PublicationBasePhotoDto, PublicationBaseDto)
) {}
