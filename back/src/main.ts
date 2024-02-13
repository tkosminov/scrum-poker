import './config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import { DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

import { AppModule } from './app.module';
import { corsOptionsDelegate } from './cors.options';
import { getOrmConfig } from './database/database-ormconfig.constant';

async function bootstrap() {
  await createDatabase({ options: getOrmConfig() as DataSourceOptions, ifNotExist: true });

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    bodyParser: true,
  });

  app.use(json({ limit: process.env.BODY_LIMIT }));
  app.use(
    urlencoded({
      limit: process.env.BODY_LIMIT,
      extended: true,
      parameterLimit: parseInt(process.env.BODY_PARAMETER_LIMIT, 10),
    })
  );

  app.use(cookieParser());

  app.enableCors(corsOptionsDelegate);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen(parseInt(process.env.APP_PORT, 10));
}

bootstrap();
