import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql';
import { Global, Module } from '@nestjs/common';
import { YogaDriverConfig, YogaDriver } from '@graphql-yoga/nestjs';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { REDIS_SUB, REDIS_PUB } from '../redis/redis.providers';

import { GRAPHQL_SUBSCRIPTION, GraphQLOptions } from './graphql.options';

@Global()
@Module({
  imports: [
    NestJSGraphQLModule.forRootAsync<YogaDriverConfig>({
      imports: [],
      useClass: GraphQLOptions,
      inject: [],
      driver: YogaDriver,
    }),
  ],
  providers: [
    {
      provide: GRAPHQL_SUBSCRIPTION,
      useFactory: () =>
        new RedisPubSub({
          publisher: REDIS_PUB,
          subscriber: REDIS_SUB,
        }),
    },
  ],
  exports: [GRAPHQL_SUBSCRIPTION],
})
export class GraphQLModule {}
