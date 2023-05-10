import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const UploaderConfigDefaultSetting = {
  App: {
    Port: 3030,
  },
  Mongo: {
    Port: 27017,
  },
} as const;

export interface UploaderConfig {
  environment: string;
  uploadDirectory: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  };
  serveRoot: string;
}

export default registerAs('application', (): UploaderConfig => {
  const config: UploaderConfig = {
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(
      process.env.PORT || UploaderConfigDefaultSetting.App.Port.toString(),
      10
    ),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(
        process.env.MONGO_PORT ??
          UploaderConfigDefaultSetting.Mongo.Port.toString(),
        10
      ),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    },
    serveRoot: process.env.SERVE_ROOT,
  };

  const validationSchema = Joi.object<UploaderConfig>({
    environment: Joi.string().valid('development', 'production', 'stage'),
    port: Joi.number().port().default(UploaderConfigDefaultSetting.App.Port),
    uploadDirectory: Joi.string(),
    db: Joi.object({
      host: Joi.string().valid().hostname(),
      port: Joi.number()
        .port()
        .default(UploaderConfigDefaultSetting.Mongo.Port),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      authBase: Joi.string().required(),
    }),
    serveRoot: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Uploader Config]: Environments validation failed. Please check .env file.
        Error message: ${error.message}`
    );
  }

  return config;
});
