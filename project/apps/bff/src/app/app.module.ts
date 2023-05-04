import { Module } from '@nestjs/common';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { HttpModule } from '@nestjs/axios';
import { CheckAuthGuard } from './guards';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    {
      ...HttpModule.register({
        timeout: HTTP_CLIENT_TIMEOUT,
        maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
      }),
      global: true,
    },
    BlogModule,
    UsersModule,
  ],
  controllers: [],
  providers: [CheckAuthGuard],
})
export class AppModule {}
