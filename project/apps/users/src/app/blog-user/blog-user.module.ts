import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogUserModel, BlogUserSchema } from './models';
import { BlogUserRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema },
    ]),
  ],
  providers: [BlogUserRepository],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
