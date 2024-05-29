import { Controller, Get, Query } from '@nestjs/common';

import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('sign-in')
  protected async signIn(@Query('name') name?: string | null) {
    return this.oauthService.signIn(name);
  }

  @Get('refresh')
  protected async refreshToken(@Query('token') token: string) {
    return this.oauthService.refreshToken(token);
  }
}
