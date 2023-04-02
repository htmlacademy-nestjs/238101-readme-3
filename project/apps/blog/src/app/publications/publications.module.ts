import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsMemoryRepository } from './repositories/publications-memory.repository';

@Module({
  providers: [PublicationsService, PublicationsMemoryRepository],
  controllers: [PublicationsController],
  exports: [PublicationsService],
})
export class PublicationsModule {}
