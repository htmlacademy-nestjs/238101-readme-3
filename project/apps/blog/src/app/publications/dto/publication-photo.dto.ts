import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PublicationBaseDto } from './publication-base.dto';

export class CreatePublicationPhotoDto extends PublicationBaseDto {
  @ApiProperty({
    description: 'photo id',
    example: '64565883481fb09b062178a9',
  })
  photo: string;
}

export class UpdatePublicationPhotoDto extends PartialType(
  CreatePublicationPhotoDto
) {}
