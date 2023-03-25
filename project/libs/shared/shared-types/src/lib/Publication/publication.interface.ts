import {
  PublicationKind,
  PublicationStatus,
  Tag,
} from '@project/shared/shared-types';

export interface Publication {
  _id?: string;

  status: PublicationStatus;
  tags?: Tag[];
  type: PublicationKind;
}

export interface PublicationLink extends Publication {
  link: string;
  description?: string;
}

export interface PublicationPhoto extends Publication {
  photo: string;
}

export interface PublicationQuote extends Publication {
  authorQuote: string;
  content: string;
}

export interface PublicationText extends Publication {
  announcement: string;
  content: string;
  name: string;
}

export interface PublicationVideo extends Publication {
  link: string;
  name: string;
}
