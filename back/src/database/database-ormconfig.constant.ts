/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DEFAULT_POSTGRESQL_PORT = 5432;

export function getOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : DEFAULT_POSTGRESQL_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.NODE_ENV}_${process.env.DB_NAME}`,
    entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsRun: false,
    synchronize: process.env.DB_SYNCHRONIZE != null ? JSON.parse(process.env.DB_SYNCHRONIZE) : false,
    logging: process.env.DB_LOGGING ? JSON.parse(process.env.DB_LOGGING) : false,
  };
}
