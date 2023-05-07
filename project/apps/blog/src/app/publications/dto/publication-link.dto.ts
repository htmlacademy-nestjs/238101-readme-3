import { IntersectionType } from '@nestjs/swagger';
import { PublicationBaseWithUserId } from './publication-base-with-user-id.dto';
import {
  CreatePublicationBaseLinkDto,
  UpdatePublicationBaseLinkDto,
} from '@project/shared/shared-types';

export class CreatePublicationLinkDto extends IntersectionType(
  PublicationBaseWithUserId,
  CreatePublicationBaseLinkDto
) {}

export class UpdatePublicationLinkDto extends IntersectionType(
  PublicationBaseWithUserId,
  UpdatePublicationBaseLinkDto
) {}
