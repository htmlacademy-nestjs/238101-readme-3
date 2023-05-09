import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/shared-types';
import { rabbitConfig } from '@project/config/config-bff';
import { MailingDto } from './dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendMailing(dto: MailingDto) {
    return this.rabbitClient.publish<MailingDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.Mailing,
      dto
    );
  }
}
