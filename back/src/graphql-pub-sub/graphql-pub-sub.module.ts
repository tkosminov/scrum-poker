import { Global, Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { REDIS_SUB, REDIS_PUB } from '../redis/redis.providers';

export const GRAPHQL_SUBSCRIPTION = 'GRAPHQL_SUBSCRIPTION';

@Global()
@Module({
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
export class GraphQLPubSubModule {}
