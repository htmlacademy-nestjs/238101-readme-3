import { IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBasePhotoDto,
  UpdatePublicationBasePhotoDto,
} from '@project/shared/shared-types';
import { PublicationBaseWithUserId } from './publication-base-with-user-id.dto';

export class CreatePublicationPhotoDto extends IntersectionType(
  PublicationBaseWithUserId,
  CreatePublicationBasePhotoDto
) {}

export class UpdatePublicationPhotoDto extends IntersectionType(
  PublicationBaseWithUserId,
  UpdatePublicationBasePhotoDto
) {}
