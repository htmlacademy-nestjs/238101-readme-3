import { IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBasePhotoDto,
  DtoWithUserId,
  UpdatePublicationBasePhotoDto,
} from '@project/shared/shared-types';

export class CreatePublicationPhotoDto extends IntersectionType(
  DtoWithUserId,
  CreatePublicationBasePhotoDto
) {}

export class UpdatePublicationPhotoDto extends IntersectionType(
  DtoWithUserId,
  UpdatePublicationBasePhotoDto
) {}
