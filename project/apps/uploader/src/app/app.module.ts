import { Module } from '@nestjs/common';

import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import {
  ConfigUploaderModule,
  getMongooseOptions,
} from '@project/config/config-uploader';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [FileService],
})
export class AppModule {}
