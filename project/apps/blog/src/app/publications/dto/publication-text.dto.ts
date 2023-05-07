import { IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseTextDto,
  UpdatePublicationBaseTextDto,
} from '@project/shared/shared-types';
import { PublicationBaseWithUserId } from './publication-base-with-user-id.dto';

export class CreatePublicationTextDto extends IntersectionType(
  PublicationBaseWithUserId,
  CreatePublicationBaseTextDto
) {}

export class UpdatePublicationTextDto extends IntersectionType(
  PublicationBaseWithUserId,
  UpdatePublicationBaseTextDto
) {}
