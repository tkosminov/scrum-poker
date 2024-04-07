import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { useLogger } from '@envelop/core';

import { DocumentNode, GraphQLArgs } from 'graphql';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { setDataSource } from 'nestjs-graphql-easy';
import { ConnectionInitMessage, Context } from 'graphql-ws';
import { IncomingMessage } from 'http';

import { LoggerStore } from '../logger/logger.store';
import { LoggerService } from '../logger/logger.service';

export const GRAPHQL_SUBSCRIPTION = 'GRAPHQL_SUBSCRIPTION';

@Injectable()
export class GraphQLOptions implements GqlOptionsFactory {
  constructor(
    private readonly dataSource: DataSource,
    private readonly loggerService: LoggerService
  ) {
    setDataSource(this.dataSource);
  }

  public createGqlOptions(): Promise<YogaDriverConfig> | YogaDriverConfig {
    return {
      autoSchemaFile: true,
      driver: YogaDriver,
      subscriptions: {
        'graphql-ws': {
          onConnect: (
            ctx: Context<
              ConnectionInitMessage['payload'],
              { request: IncomingMessage & { logger_store: LoggerStore; current_user: IJwtPayload } }
            >
          ) => {
            ctx.extra.request.logger_store = new LoggerStore(this.loggerService);

            return true;
          },
        },
        'subscriptions-transport-ws': false,
      },
      context: ({ req }: { req: Request & { logger_store: LoggerStore; current_user: IJwtPayload } }) => ({
        req,
        logger_store: req.logger_store,
        current_user: req.current_user,
      }),
      plugins: [
        useLogger({
          logFn: (
            event_name: string,
            {
              args,
            }: {
              args: GraphQLArgs & {
                document: DocumentNode;
                contextValue: {
                  req: Request;
                  logger_store: LoggerStore;
                  params: {
                    query: string;
                  };
                };
              };
              result?: unknown;
            }
          ) => {
            const ctx = args.contextValue;
            const logger_store: LoggerStore = ctx.logger_store;

            let operation: string;
            const selections: string[] = [];

            args.document.definitions.forEach((definition) => {
              if (definition.kind === 'OperationDefinition') {
                operation = definition.operation;

                definition.selectionSet.selections.forEach((selection) => {
                  if (selection.kind === 'Field') {
                    selections.push(selection.name.value);
                  }
                });
              }
            });

            logger_store.info(`GraphQL ${event_name}`, { event: event_name, operation, selections });
          },
        }),
      ],
    };
  }
}
