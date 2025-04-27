import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/schemas/userSchema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google.oauth.config';
import { GoogleStrategy } from './startegies/google.strategy';
import { FacebookStrategy } from './startegies/facebook.strategy';
import facebookOauthConfig from './config/facebook.oauth.config';

@Module({
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
    ConfigModule.forFeature(facebookOauthConfig), // Loads your custom config
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'shadowsector1',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy],
})
export class AuthModule {}
