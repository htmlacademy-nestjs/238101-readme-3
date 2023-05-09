import { Entity, Mailing } from '@project/shared/shared-types';

export class EmailMailingEntity implements Entity<EmailMailingEntity>, Mailing {
  public id: string;
  public mailingDate: string;

  constructor(emailSubscriber: Mailing) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: Mailing) {
    this.id = entity.id ?? '';
    this.mailingDate = entity.mailingDate;
  }

  public toObject(): EmailMailingEntity {
    return { ...this };
  }
}
