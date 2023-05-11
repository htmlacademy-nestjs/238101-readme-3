/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getAppRunningString } from '@project/util/util-core';

import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/interceptors';
import { AxiosExceptionFilter } from './app/filters';

const AppDefaultSetting = {
  Port: 4000,
  GlobalPrefix: 'api',
  Swagger: {
    Description: 'Readme BFF',
    Title: 'Readme app',
    Path: 'docs',
    Version: '1.0',
  },
} as const;

async function bootstrap() {
  const port = process.env.PORT || AppDefaultSetting.Port;
  const globalPrefix =
    process.env.GLOBAL_PREFIX || AppDefaultSetting.GlobalPrefix;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(new AxiosExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RequestIdInterceptor());

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
