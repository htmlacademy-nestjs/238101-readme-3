import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from './repositories';
import { PublicationsModule } from '../publications/publications.module';

@Module({
  imports: [PublicationsModule],
  providers: [LikesService, LikesRepository],
  controllers: [LikesController],
})
export class LikesModule {}
