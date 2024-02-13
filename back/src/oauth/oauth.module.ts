import { Module } from '@nestjs/common';

import { OAuthController } from './oath.controller';
import { OAuthService } from './oauth.service';

@Module({
  imports: [],
  providers: [OAuthService],
  controllers: [OAuthController],
  exports: [],
})
export class OAuthModule {}
