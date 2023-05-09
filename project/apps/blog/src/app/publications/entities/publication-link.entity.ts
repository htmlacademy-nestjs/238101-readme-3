import { PublicationKind, PublicationLink } from '@project/shared/shared-types';
import {
  PublicationEntity,
  PublicationEntityConstructor,
} from './publication.entity';

export class PublicationLinkEntity extends PublicationEntity {
  public type: (typeof PublicationKind)['Link'] = PublicationKind.Link;

  public description?: string;
  public link: string;

  constructor(publication: PublicationEntityConstructor<PublicationLink>) {
    super(publication);
  }

  fillEntity(entity: Omit<PublicationLink, 'type'>) {
    super.fillEntity(entity);
    this.description = entity.description;
    this.link = entity.link;
  }

  public toObject(): PublicationLink {
    return { ...this };
  }
}
