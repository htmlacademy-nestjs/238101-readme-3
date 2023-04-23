import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './repositories/publications.repository';

@Module({
  providers: [PublicationsService, PublicationsRepository],
  controllers: [PublicationsController],
  exports: [PublicationsService],
})
export class PublicationsModule {}
