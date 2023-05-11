import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const ApplicationConfigDefaultSetting = {
  App: {
    Port: 3000,
    GlobalPrefix: 'api',
  },
};

export interface ApplicationConfig {
  environment: string;
  port: number;
  globalPrefix: string;
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(
      process.env.PORT || ApplicationConfigDefaultSetting.App.Port.toString(),
      10
    ),
    globalPrefix:
      process.env.GLOBAL_PREFIX ||
      ApplicationConfigDefaultSetting.App.GlobalPrefix,
  };

  const validationSchema = Joi.object<ApplicationConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage')
      .required(),
    port: Joi.number().port().default(ApplicationConfigDefaultSetting.App.Port),
    globalPrefix: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Application Config]: Environments validation failed. Please check .env file.
       Error message: Mongo.${error.message}`
    );
  }

  return config;
});
