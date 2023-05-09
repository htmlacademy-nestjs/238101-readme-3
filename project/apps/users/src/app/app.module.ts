import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ConfigUsersModule,
  getMongooseOptions,
} from '@project/config/config-users';

import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    RefreshTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
