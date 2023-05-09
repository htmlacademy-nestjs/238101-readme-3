import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogUserModel, BlogUserSchema } from './models';
import { BlogUserRepository } from './repositories';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema },
    ]),
  ],
  controllers: [BlogUserController],
  providers: [BlogUserService, BlogUserRepository],
  exports: [BlogUserService, BlogUserRepository],
})
export class BlogUserModule {}
