import { Injectable, NestMiddleware } from '@nestjs/common';
import { isJWT } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { getRequestHeader } from '../helpers/req.helper';
import { EExceptionType, authorizationFailed, jwtTokenExpiredSignature, unauthorized } from '../helpers/errors.helper';

@Injectable()
export class OAuthMiddleware implements NestMiddleware {
  public async use(req: Request & { current_user?: IJwtPayload }, _res: Response, next: NextFunction) {
    if (
      req.body &&
      (req.body.operationName === 'IntrospectionQuery' ||
        (typeof req.body.query === 'string' && req.body.query.startsWith('query IntrospectionQuery')))
    ) {
      return next();
    }

    const token = getRequestHeader(req, 'authorization');

    if (token?.length) {
      if (isJWT(token)) {
        try {
          const payload = verify(token, process.env.JWT_SECRET) as IJwtPayload;

          if (!payload.token_type || payload.token_type !== 'access') {
            return next(authorizationFailed(EExceptionType.HTTP));
          }

          req.current_user = payload;

          return next();
        } catch (e) {
          return next(jwtTokenExpiredSignature(EExceptionType.HTTP));
        }
      }
    }

    return next(unauthorized(EExceptionType.HTTP));
  }
}
