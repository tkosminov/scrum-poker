import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { YogaDriverConfig, YogaDriver } from '@graphql-yoga/nestjs';

import { GraphQLOptions } from './graphql.options';

@Module({
  imports: [
    NestJSGraphQLModule.forRootAsync<YogaDriverConfig>({
      imports: [],
      useClass: GraphQLOptions,
      inject: [],
      driver: YogaDriver,
    }),
  ],
  exports: [],
})
export class GraphQLModule {}
