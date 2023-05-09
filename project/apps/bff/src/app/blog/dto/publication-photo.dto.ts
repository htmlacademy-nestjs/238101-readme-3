import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreatePublicationBasePhotoDto } from '@project/shared/shared-types';

export class BffPublicationPhotoDto extends OmitType(
  CreatePublicationBasePhotoDto,
  ['photo', 'tags']
) {
  @ApiProperty({
    description: `publication photo (1mb, jpg/png)`,
    type: 'string',
    format: 'binary',
  })
  public photo: File;

  @ApiProperty({
    description: 'tags',
    required: false,
  })
  public tags: string;
}
