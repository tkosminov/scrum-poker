import { HttpException, Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { useLogger } from '@envelop/core';

import { DocumentNode, GraphQLArgs, GraphQLError } from 'graphql';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { setDataSource } from 'nestjs-graphql-easy';
import { ConnectionInitMessage, Context } from 'graphql-ws';
import { IncomingMessage } from 'http';
import { verify } from 'jsonwebtoken';

import { getCookie } from '../helpers/req.helper';
// import { EExceptionType, authorizationFailed, jwtTokenExpiredSignature, unauthorized } from '../helpers/errors.helper';
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
            const access_token = getCookie(ctx.extra.request.headers.cookie || '', 'access_token');

            if (access_token?.length) {
              try {
                const payload = verify(access_token, process.env.JWT_SECRET) as IJwtPayload;

                if (!payload.token_type || payload.token_type !== 'access') {
                  // throw authorizationFailed(EExceptionType.COMMON);
                  return false;
                }

                ctx.extra.request.current_user = payload;
                ctx.extra.request.logger_store = new LoggerStore(this.loggerService);

                return true;
              } catch (e) {
                // throw jwtTokenExpiredSignature(EExceptionType.COMMON);
                return false;
              }
            }

            return false;
            // throw unauthorized(EExceptionType.COMMON);
          },
        },
        'subscriptions-transport-ws': false,
      },
      context: ({ req }: { req: Request & { logger_store: LoggerStore; current_user: IJwtPayload } }) => ({
        req,
        logger_store: req.logger_store,
        current_user: req.current_user,
      }),
      maskedErrors: {
        maskError(error, message: string) {
          if (error instanceof GraphQLError) {
            if (error.originalError?.name === GraphQLError.name) {
              return error;
            }

            let graphql_error_message = error.originalError?.name || message;
            let original_error_message: unknown = error.message;

            if (error.originalError instanceof HttpException) {
              const response = error.originalError.getResponse();

              if (response) {
                if (typeof response === 'string') {
                  original_error_message = response;
                } else {
                  original_error_message = (response as { message?: unknown }).message;
                }
              }
            } else if (error.originalError?.name === 'NonErrorThrown') {
              graphql_error_message = 'BadRequestException';
              original_error_message = (
                error.originalError as unknown as {
                  name: string;
                  thrownValue: { status: string; message: unknown };
                }
              ).thrownValue.message;
            }

            return new GraphQLError(graphql_error_message, {
              nodes: error.nodes,
              source: error.source,
              positions: error.positions,
              path: error.path,
              extensions: {
                originalError: { message: original_error_message },
              },
            });
          } else {
            return new GraphQLError(message, {
              extensions: {
                originalError: error instanceof Error ? { message: error.message } : undefined,
              },
            });
          }
        },
      },
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
