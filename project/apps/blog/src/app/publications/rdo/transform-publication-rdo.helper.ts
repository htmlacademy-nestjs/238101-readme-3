import { PublicationKind } from '@project/shared/shared-types';
import { fillObject } from '@project/util/util-core';
import {
  PublicationLinkRdo,
  PublicationPhotoRdo,
  PublicationQuoteRdo,
  PublicationTextRdo,
  PublicationVideoRdo,
} from './';
import { Publication } from '@prisma/client';

export const transformPublicationToRdo = (publication: Publication) => {
  if (publication.type === PublicationKind.Link) {
    return fillObject(PublicationLinkRdo, publication);
  }

  if (publication.type === PublicationKind.Photo) {
    return fillObject(PublicationPhotoRdo, publication);
  }

  if (publication.type === PublicationKind.Quote) {
    return fillObject(PublicationQuoteRdo, publication);
  }

  if (publication.type === PublicationKind.Text) {
    return fillObject(PublicationTextRdo, publication);
  }

  if (publication.type === PublicationKind.Video) {
    return fillObject(PublicationVideoRdo, publication);
  }

  return publication;
};
