import { Controller, Get, Query } from '@nestjs/common';

import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('sign-in')
  protected async signIn() {
    return this.oauthService.signIn();
  }

  @Get('refresh')
  protected async refreshToken(@Query('token') token: string) {
    return this.oauthService.refreshToken(token);
  }
}
