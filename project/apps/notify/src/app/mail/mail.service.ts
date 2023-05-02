import { Subscriber } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewPosts(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: 'New posts added',
      template: './post-news',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      },
    });
  }
}
