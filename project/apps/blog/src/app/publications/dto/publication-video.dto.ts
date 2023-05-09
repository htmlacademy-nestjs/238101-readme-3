import { IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseVideoDto,
  DtoWithUserId,
  UpdatePublicationBaseVideoDto,
} from '@project/shared/shared-types';

export class CreatePublicationVideoDto extends IntersectionType(
  DtoWithUserId,
  CreatePublicationBaseVideoDto
) {}

export class UpdatePublicationVideoDto extends IntersectionType(
  DtoWithUserId,
  UpdatePublicationBaseVideoDto
) {}
