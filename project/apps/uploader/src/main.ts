/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getAppRunningString } from '@project/util/util-core';

import { AppModule } from './app/app.module';

import { urlencoded, json } from 'express';

const AppDefaultSetting = {
  Port: 3333,
  GlobalPrefix: 'api',
  Swagger: {
    Description: 'Uploader service API',
    Title: 'The "Uploader" service',
    Path: 'docs',
    Version: '1.0',
  },
  FileLimit: '50mb',
} as const;

async function bootstrap() {
  const port = process.env.PORT || AppDefaultSetting.Port;
  const globalPrefix =
    process.env.GLOBAL_PREFIX || AppDefaultSetting.GlobalPrefix;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);

  app.use(json({ limit: AppDefaultSetting.FileLimit }));
  app.use(urlencoded({ extended: true, limit: AppDefaultSetting.FileLimit }));

  const config = new DocumentBuilder()
    .setTitle(AppDefaultSetting.Swagger.Title)
    .setDescription(AppDefaultSetting.Swagger.Description)
    .setVersion(AppDefaultSetting.Swagger.Version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(AppDefaultSetting.Swagger.Path, app, document);

  await app.listen(port);

  const appRunningString = getAppRunningString(port, globalPrefix);
  Logger.log(appRunningString);
}

bootstrap();
