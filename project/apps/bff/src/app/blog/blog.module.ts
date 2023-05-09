import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { UsersModule } from '../users/users.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [UsersModule, NotifyModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
