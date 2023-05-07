import { IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseVideoDto,
  UpdatePublicationBaseVideoDto,
} from '@project/shared/shared-types';
import { PublicationBaseWithUserId } from './publication-base-with-user-id.dto';

export class CreatePublicationVideoDto extends IntersectionType(
  PublicationBaseWithUserId,
  CreatePublicationBaseVideoDto
) {}

export class UpdatePublicationVideoDto extends IntersectionType(
  PublicationBaseWithUserId,
  UpdatePublicationBaseVideoDto
) {}
