import { Module } from '@nestjs/common';
import { PublicationsModule } from './publications/publications.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PublicationsModule, PrismaModule, LikesModule, CommentsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
