import { Publications, User } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailingEmailParams } from './consts';

const TEMPLATE_PATH = './post-news';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewPosts(user: User, publications: Publications[]) {
    const { email, name } = user;

    await this.mailerService.sendMail({
      to: email,
      subject: MailingEmailParams.Subject,
      template: TEMPLATE_PATH,
      context: {
        user: `${name}`,
        publications: publications,
      },
    });
  }
}
