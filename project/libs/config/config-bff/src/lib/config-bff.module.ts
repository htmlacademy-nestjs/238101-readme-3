import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import rabbitConfig from './rabbit.config';

const ENV_FILE_PATH = 'apps/bff/.bff.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigBffModule {}
