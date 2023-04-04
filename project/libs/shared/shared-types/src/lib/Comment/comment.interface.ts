import { Publication } from '@project/shared/shared-types';

export interface Comment {
  _id?: string;

  content: string;
  publicationId: Publication['_id'];
}
