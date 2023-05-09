import { getSchemaPath } from '@nestjs/swagger';
import {
  PublicationLinkRdo,
  PublicationPhotoRdo,
  PublicationQuoteRdo,
  PublicationTextRdo,
  PublicationVideoRdo,
} from '@project/shared/shared-types';

export const AllPublicationsSchema = [
  { $ref: getSchemaPath(PublicationLinkRdo) },
  { $ref: getSchemaPath(PublicationPhotoRdo) },
  { $ref: getSchemaPath(PublicationQuoteRdo) },
  { $ref: getSchemaPath(PublicationTextRdo) },
  { $ref: getSchemaPath(PublicationVideoRdo) },
];
