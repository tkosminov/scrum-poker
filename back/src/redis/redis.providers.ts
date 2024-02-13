import { Provider } from '@nestjs/common';

import IORedis, { Redis } from 'ioredis';

import { REDIS_DEFAULT_PORT, REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from './redis.constants';

export const REDIS_SUB = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : REDIS_DEFAULT_PORT,
  password: process.env.REDIS_PASSWORD,
  keyPrefix: process.env.REDIS_KEY,
});

export const REDIS_PUB = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : REDIS_DEFAULT_PORT,
  password: process.env.REDIS_PASSWORD,
  keyPrefix: process.env.REDIS_KEY,
});

export const redis_providers: Provider[] = [
  {
    useFactory: (): Redis => REDIS_SUB,
    provide: REDIS_SUBSCRIBER_CLIENT,
  },
  {
    useFactory: (): Redis => REDIS_PUB,
    provide: REDIS_PUBLISHER_CLIENT,
  },
];
