import { Entity, Subscriber } from '@project/shared/shared-types';

export class EmailSubscriberEntity
  implements Entity<EmailSubscriberEntity>, Subscriber
{
  public id: string;
  public email: string;
  public name: string;
  public userId: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: Subscriber) {
    this.id = entity.id ?? '';
    this.email = entity.email;
    this.name = entity.name;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
