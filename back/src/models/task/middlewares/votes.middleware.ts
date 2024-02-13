import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const TaskVotesMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  const votes = await next();

  return votes;
};
