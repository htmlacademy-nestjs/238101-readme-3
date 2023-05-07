import { PublicationKind, PublicationText } from '@project/shared/shared-types';
import {
  PublicationEntity,
  PublicationEntityConstructor,
} from './publication.entity';

export class PublicationTextEntity extends PublicationEntity {
  public type: (typeof PublicationKind)['Text'] = PublicationKind.Text;

  public announcement: string;
  public content: string;
  public name: string;

  constructor(publication: PublicationEntityConstructor<PublicationText>) {
    super(publication);
  }

  fillEntity(entity: Omit<PublicationText, 'type'>) {
    super.fillEntity(entity);
    this.announcement = entity.announcement;
    this.content = entity.content;
    this.name = entity.name;
  }

  public toObject(): PublicationText {
    return { ...this };
  }
}
