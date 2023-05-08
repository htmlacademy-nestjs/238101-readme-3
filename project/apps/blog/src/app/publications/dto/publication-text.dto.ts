import { IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseTextDto,
  DtoWithUserId,
  UpdatePublicationBaseTextDto,
} from '@project/shared/shared-types';

export class CreatePublicationTextDto extends IntersectionType(
  DtoWithUserId,
  CreatePublicationBaseTextDto
) {}

export class UpdatePublicationTextDto extends IntersectionType(
  DtoWithUserId,
  UpdatePublicationBaseTextDto
) {}
