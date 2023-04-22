import { PublicationKind } from '@project/shared/shared-types';
import { fillObject } from '@project/util/util-core';
import { CreatePublicationLinkRdo } from './create-publication-link.rdo';
import { CreatePublicationPhotoRdo } from './create-publication-photo.rdo';
import { CreatePublicationQuoteRdo } from './create-publication-quote.rdo';
import { CreatePublicationTextRdo } from './create-publication-text.rdo';
import { CreatePublicationVideoRdo } from './create-publication-video.rdo';
import { Publication } from '@prisma/client';

export const transformPublicationToRdo = (publication: Publication) => {
  if (publication.type === PublicationKind.Link) {
    return fillObject(CreatePublicationLinkRdo, publication);
  }

  if (publication.type === PublicationKind.Photo) {
    return fillObject(CreatePublicationPhotoRdo, publication);
  }

  if (publication.type === PublicationKind.Quote) {
    return fillObject(CreatePublicationQuoteRdo, publication);
  }

  if (publication.type === PublicationKind.Text) {
    return fillObject(CreatePublicationTextRdo, publication);
  }

  if (publication.type === PublicationKind.Video) {
    return fillObject(CreatePublicationVideoRdo, publication);
  }

  return publication;
};
