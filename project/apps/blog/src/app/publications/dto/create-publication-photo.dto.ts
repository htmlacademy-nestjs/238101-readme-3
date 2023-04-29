import { ApiProperty } from '@nestjs/swagger';
import { PublicationBaseDto } from './publication-base.dto';

export class CreatePublicationPhotoDto extends PublicationBaseDto {
  @ApiProperty({
    description: 'photo, max 1Mb, jpg/png',
    example: 'cat.png',
  })
  //TODO: file validation
  photo: string;
}
