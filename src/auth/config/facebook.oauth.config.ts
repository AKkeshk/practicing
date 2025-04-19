import { registerAs } from '@nestjs/config';
require('dotenv').config();

export default registerAs('facebookOAuth', () => ({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET_ID,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
}));
