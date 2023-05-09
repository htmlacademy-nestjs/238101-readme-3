import { Module } from '@nestjs/common';
import { HttpClientSetting } from './app.config';
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
        timeout: HttpClientSetting.Timeout,
        maxRedirects: HttpClientSetting.MaxRedirects,
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
