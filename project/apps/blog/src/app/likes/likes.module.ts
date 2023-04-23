import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from './repositories';

@Module({
  providers: [LikesService, LikesRepository],
  controllers: [LikesController],
})
export class LikesModule {}
