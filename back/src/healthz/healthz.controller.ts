import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  MicroserviceHealthIndicator,
  HealthIndicatorFunction,
} from '@nestjs/terminus';

import { TOTAL_MEMORY_HEAP, TOTAL_MEMORY_RSS } from './healthz.constants';
import { REDIS_DEFAULT_PORT } from 'src/redis/redis.constants';

@Controller('healthz')
export class HealthzController {
  constructor(
    private readonly healthz: HealthCheckService,
    private readonly db_healthz: TypeOrmHealthIndicator,
    private readonly memory_healthz: MemoryHealthIndicator,
    private readonly micro_healthz: MicroserviceHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  public async check() {
    const service_ping_checks: HealthIndicatorFunction[] = [
      () => this.db_healthz.pingCheck('PostgreSQL'),
      () =>
        this.micro_healthz.pingCheck('Redis', {
          transport: Transport.REDIS,
          options: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT != null ? parseInt(process.env.REDIS_PORT, 10) : REDIS_DEFAULT_PORT,
            password: process.env.REDIS_PASSWORD,
            keyPrefix: process.env.REDIS_KEY,
          },
        }),
      () => this.memory_healthz.checkHeap('MEMORY_HEAP', TOTAL_MEMORY_HEAP),
      () => this.memory_healthz.checkRSS('MEMORY_RSS', TOTAL_MEMORY_RSS),
    ];

    return this.healthz.check(service_ping_checks);
  }
}
