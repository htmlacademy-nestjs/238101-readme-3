import { Publication } from '@project/shared/shared-types';

export interface Comment {
  id?: number;

  authorId: string;
  publicationId: Publication['id'];
  text: string;

  createdAt?: Date;
  updatedAt?: Date;
}
