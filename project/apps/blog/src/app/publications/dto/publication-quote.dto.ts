import { IntersectionType } from '@nestjs/swagger';
import {
  CreatePublicationBaseQuoteDto,
  UpdatePublicationBaseQuoteDto,
} from '@project/shared/shared-types';
import { PublicationBaseWithUserId } from './publication-base-with-user-id.dto';

export class CreatePublicationQuoteDto extends IntersectionType(
  PublicationBaseWithUserId,
  CreatePublicationBaseQuoteDto
) {}

export class UpdatePublicationQuoteDto extends IntersectionType(
  PublicationBaseWithUserId,
  UpdatePublicationBaseQuoteDto
) {}
