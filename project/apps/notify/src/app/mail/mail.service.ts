import { Publications, User } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewPosts(user: User, publications: Publications[]) {
    const { email, name } = user;

    await this.mailerService.sendMail({
      to: email,
      subject: 'New posts added',
      template: './post-news',
      context: {
        user: `${name}`,
        publications: publications,
      },
    });
  }
}
