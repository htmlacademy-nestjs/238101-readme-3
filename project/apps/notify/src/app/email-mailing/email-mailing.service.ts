import { EmailMailingEntity } from './email-mailing.entity';
import { EmailMailingRepository } from './email-mailing.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailMailingService {
  constructor(
    private readonly emailMailingRepository: EmailMailingRepository
  ) {}

  public async getLastMailingDate() {
    const lastMailing = this.emailMailingRepository.findLast();

    if (!lastMailing) {
      return null;
    }

    return lastMailing;
  }

  public async saveMailing() {
    const today = new Date().toISOString();

    const emailSubscriberEntity = new EmailMailingEntity({
      mailingDate: today,
    });

    return this.emailMailingRepository.create(emailSubscriberEntity);
  }
}
