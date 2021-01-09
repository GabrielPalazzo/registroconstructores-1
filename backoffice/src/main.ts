import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { LoggingInterceptor } from './auth/auth.interceptor';

async function bootstrap() {
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
  app.useGlobalInterceptors(new LoggingInterceptor());
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
  // await app.listen(3038);

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
    app.listen(3030),
    userMicroService.listen(
        () => console.log('Microservice User is listening...')
      )
    ]);
}
bootstrap();
