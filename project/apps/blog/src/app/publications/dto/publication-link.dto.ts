import { IntersectionType } from '@nestjs/swagger';

import {
  CreatePublicationBaseLinkDto,
  DtoWithUserId,
  UpdatePublicationBaseLinkDto,
} from '@project/shared/shared-types';

export class CreatePublicationLinkDto extends IntersectionType(
  DtoWithUserId,
  CreatePublicationBaseLinkDto
) {}

export class UpdatePublicationLinkDto extends IntersectionType(
  DtoWithUserId,
  UpdatePublicationBaseLinkDto
) {}
