import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, dbConfig, jwtConfig } from './config';

const ENV_USERS_FILE_PATH = 'apps/users/.users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class ConfigUsersModule {}
