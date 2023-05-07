import {
  PublicationKind,
  PublicationVideo,
} from '@project/shared/shared-types';
import {
  PublicationEntity,
  PublicationEntityConstructor,
} from './publication.entity';

export class PublicationVideoEntity extends PublicationEntity {
  public type: (typeof PublicationKind)['Video'] = PublicationKind.Video;
  public link: string;
  public name: string;

  constructor(publication: PublicationEntityConstructor<PublicationVideo>) {
    super(publication);
  }

  fillEntity(entity: Omit<PublicationVideo, 'type'>) {
    super.fillEntity(entity);
    this.link = entity.link;
    this.name = entity.name;
  }

  public toObject(): PublicationVideo {
    return { ...this };
  }
}
