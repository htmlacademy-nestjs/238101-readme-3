import { Publication } from './publication';

export interface Comment {
  id?: number;

  authorId: string;
  publicationId: Publication['id'];
  text: string;

  createdAt?: Date;
  updatedAt?: Date;
}
