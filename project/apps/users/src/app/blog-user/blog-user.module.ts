import { Module } from '@nestjs/common';
import { BlogUserMemoryRepository } from './repositories';

@Module({
  providers: [BlogUserMemoryRepository],
  exports: [BlogUserMemoryRepository],
})
export class BlogUserModule {}
