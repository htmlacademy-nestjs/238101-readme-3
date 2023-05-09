import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailMailingModel, EmailMailingSchema } from './email-mailing.model';
import { EmailMailingRepository } from './email-mailing.repository';
import { EmailMailingService } from './email-mailing.service';
import { EmailMailingController } from './email-mailing.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailMailingModel.name, schema: EmailMailingSchema },
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  controllers: [EmailMailingController],
  providers: [
    EmailMailingService,
    EmailMailingRepository,
    EmailMailingController,
  ],
})
export class EmailMailingModule {}
