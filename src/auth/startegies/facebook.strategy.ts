import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyFunction } from 'passport-facebook';

import facebookOAuthConfig from '../config/facebook.oauth.config';

import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    @Inject(facebookOAuthConfig.KEY)
    private facebookConfig: ConfigType<typeof facebookOAuthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: facebookConfig.clientID,
      clientSecret: facebookConfig.clientSecret,
      callbackURL: facebookConfig.callbackURL,
      profileFields: ['emails', 'name', 'photos'],
    });
  }

  async validate(
    access_token: string,
    refreshToken: string,
    profile: any,
    done: VerifyFunction,
  ) {
    console.log({ profile });
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatarUrl: profile.photos[0].value,
      password: ' ',
    });
    done(null, user);
  }
}
