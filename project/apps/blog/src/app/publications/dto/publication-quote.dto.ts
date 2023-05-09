import { IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseQuoteDto,
  DtoWithUserId,
  UpdatePublicationBaseQuoteDto,
} from '@project/shared/shared-types';

export class CreatePublicationQuoteDto extends IntersectionType(
  DtoWithUserId,
  CreatePublicationBaseQuoteDto
) {}

export class UpdatePublicationQuoteDto extends IntersectionType(
  DtoWithUserId,
  UpdatePublicationBaseQuoteDto
) {}
