import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@project/config/config-notify';
import { getMongooseOptions } from '@project/util/util-core';
import { MailModule } from './mail/mail.module';
import { EmailMailingModule } from './email-mailing/email-mailing.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    EmailMailingModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
