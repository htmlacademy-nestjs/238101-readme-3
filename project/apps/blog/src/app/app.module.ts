import { Module } from '@nestjs/common';
import { PublicationsModule } from './publications/publications.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PublicationsModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
