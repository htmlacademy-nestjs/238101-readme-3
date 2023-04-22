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

  createdAt?: string;
  updatedAt?: string;
}

export interface PublicationLink extends Publication {
  description?: string;
  link: string;
  type: PublicationKind.Link;
}

export interface PublicationPhoto extends Publication {
  photo: string;
  type: PublicationKind.Photo;
}

export interface PublicationQuote extends Publication {
  authorQuote: string;
  content: string;
  type: PublicationKind.Quote;
}

export interface PublicationText extends Publication {
  announcement: string;
  content: string;
  name: string;
  type: PublicationKind.Text;
}

export interface PublicationVideo extends Publication {
  link: string;
  name: string;
  type: PublicationKind.Video;
}

export type Publications =
  | PublicationLink
  | PublicationPhoto
  | PublicationQuote
  | PublicationText
  | PublicationVideo;
