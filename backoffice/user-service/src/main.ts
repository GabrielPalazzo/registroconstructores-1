import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
// import * as Sentry from 'winston-raven-sentry';

// import { SentryService } from '@ntegral/nestjs-sentry';

async function bootstrap() {
  const sentryOptions = {
    dsn:
      'https://754be57d97c44b20afdcbd077a3f4ff0@o411788.ingest.sentry.io/5287511',
    level: 'debug',
    sendTimeout: 5,
    format: winston.format.combine(
      winston.format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(),
    ),
  };

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        // new Sentry(sentryOptions),
      ],
    }),
  });
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('users/doc', app, document);
  await app.listen(3038);

  const userMicroService = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      /*options: {
        host: '127.0.0.1',
        port: 4042
      }*/
    },
  );

  await Promise.all([
    app.listen(3032),
    userMicroService.listen(
        () => Logger.log('Microservice User is listening...')
      )
    ]);
}
bootstrap();
