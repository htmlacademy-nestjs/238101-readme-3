import { Module } from '@nestjs/common';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { HttpModule } from '@nestjs/axios';
import { CheckAuthGuard } from './guards';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './users/users.module';
import { NotifyModule } from './notify/notify.module';
import { ConfigBffModule } from '@project/config/config-bff';

@Module({
  imports: [
    ConfigBffModule,
    {
      ...HttpModule.register({
        timeout: HTTP_CLIENT_TIMEOUT,
        maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
      }),
      global: true,
    },

    BlogModule,
    UsersModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [CheckAuthGuard],
})
export class AppModule {}
