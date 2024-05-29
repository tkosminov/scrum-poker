import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Algorithm, sign, verify } from 'jsonwebtoken';
import { v4 } from 'uuid';
import randomAnimalName from 'random-animal-name';

import { User } from '../models/user/user.entity';
import {
  EExceptionType,
  authorizationFailed,
  jwtTokenExpiredSignature,
  refreshTokenExpiredSignature,
} from '../helpers/errors.helper';

@Injectable()
export class OAuthService {
  constructor(@InjectRepository(User) private readonly user_repository: Repository<User>) {}

  public async signIn(name?: string | null) {
    const {
      raw: [user],
    }: { raw: [User] } = await this.user_repository
      .createQueryBuilder()
      .insert()
      .values({ name: name || randomAnimalName() })
      .returning('*')
      .execute();

    return this.generateTokens(user.id);
  }

  public async refreshToken(token: string) {
    const { id, token_type } = this.verifyToken<IJwtPayload>(token, false);

    if (!token_type || token_type !== 'refresh') {
      throw authorizationFailed(EExceptionType.HTTP);
    }

    return this.generateTokens(id);
  }

  protected verifyToken<T>(jwt_token: string, is_access_token = true) {
    try {
      return verify(jwt_token, process.env.JWT_SECRET) as T;
    } catch (error) {
      if (is_access_token) {
        throw jwtTokenExpiredSignature(EExceptionType.HTTP);
      } else {
        throw refreshTokenExpiredSignature(EExceptionType.HTTP);
      }
    }
  }

  protected async generateTokens(user_id: string) {
    const access_token = sign({ id: user_id, token_type: 'access' }, process.env.JWT_SECRET, {
      jwtid: v4(),
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRES_IN}m`,
      algorithm: process.env.JWT_ALGORITHM as Algorithm,
    });

    const refresh_token = sign({ id: user_id, token_type: 'refresh' }, process.env.JWT_SECRET, {
      jwtid: v4(),
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}m`,
      algorithm: process.env.JWT_ALGORITHM as Algorithm,
    });

    return {
      access_token,
      access_token_expires_at: new Date(
        new Date().setMinutes(new Date().getMinutes() + parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN, 10))
      ).toISOString(),
      refresh_token,
      refresh_token_expires_at: new Date(
        new Date().setMinutes(new Date().getMinutes() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN, 10))
      ).toISOString(),
    };
  }
}
