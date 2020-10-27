import { Logger, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { SentryModule } from '@ntegral/nestjs-sentry';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// import { LogLevel } from '@sentry/types';
/*
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import Sentry from 'winston-sentry-log';
*/

@Module({
  imports: [
    ConfigModule.forRoot(),
    /*
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
          new Sentry({
            config: {
              dsn:
                'https://754be57d97c44b20afdcbd077a3f4ff0@o411788.ingest.sentry.io/5287511',
              environment: 'development',
              serverName: 'Notifications Api',
            },
            level: 'info',
          }),
        ],
      }),
      inject: [],
    }),
    */
    /*
    SentryModule.forRoot({
      dsn:
        'https://754be57d97c44b20afdcbd077a3f4ff0@o411788.ingest.sentry.io/5287511',
      debug: false,
      environment: process.env.NODE_ENV,
      release: 'Users Api', // must create a release in sentry.io dashboard
      logLevel: LogLevel.Debug, //based on sentry.io loglevel //
    }),*/
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
