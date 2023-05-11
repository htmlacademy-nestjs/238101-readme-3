/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getAppModeString, getAppRunningString } from '@project/util/util-core';

import { AppModule } from './app/app.module';
import { ApplicationConfig } from '@project/config/config-users';

const AppDefaultSetting = {
  Config: {
    Namespace: 'application',
  },
  Swagger: {
    Description: 'Users service API',
    Title: 'The «Users» service',
    Path: 'docs',
    Version: '1.0',
  },
} as const;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const { port, globalPrefix, environment } =
    configService.get<ApplicationConfig>(AppDefaultSetting.Config.Namespace);

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(AppDefaultSetting.Swagger.Title)
    .setDescription(AppDefaultSetting.Swagger.Description)
    .setVersion(AppDefaultSetting.Swagger.Version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(AppDefaultSetting.Swagger.Path, app, document);

  await app.listen(port);

  Logger.log(getAppRunningString(port, globalPrefix));
  Logger.log(getAppModeString(environment));
}

bootstrap();
