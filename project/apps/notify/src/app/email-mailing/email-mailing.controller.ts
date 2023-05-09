import { EmailMailingService } from './email-mailing.service';
import { Controller, Get } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MailingRdo, RabbitRouting } from '@project/shared/shared-types';
import { MailService } from '../mail/mail.service';
import { MailingDto } from './dto/mailing.dto';
import { fillObject } from '@project/util/util-core';

@Controller()
export class EmailMailingController {
  constructor(
    private readonly mailingService: EmailMailingService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.Mailing,
    queue: 'readme.notify',
  })
  public async create(mailing: MailingDto) {
    const { users, publications } = mailing;

    await this.mailingService.saveMailing();

    users.forEach(async (user) => {
      await this.mailService.sendNotifyNewPosts(user, publications);
    });
  }

  @Get()
  public async getLastMailingDate() {
    const mailingRecord = await this.mailingService.getLastMailingDate();
    return fillObject(MailingRdo, mailingRecord);
  }
}
