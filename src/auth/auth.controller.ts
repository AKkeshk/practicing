import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { FacebookGuard } from './guards/google-auth/facebook.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    console.log('any edit');
    return this.authService.login(loginDto);
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto, rePassword: string) {
    return this.authService.signUp(createUserDto);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    console.log('🎯 Callback route hit');
    console.log('👤 req.user:', req.user); // Should NOT be undefined

    if (!req.user) {
      return res.status(400).send('User not authenticated');
    }

    const response = await this.authService.loginWithGoogle(req.user.sub);
    return res.redirect(
      `https://practicing-x8va.onrender.com?token=${response.access_token}`,
    );
  }
  @Get('facebook/login')
  @UseGuards(FacebookGuard)
  facebook() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@Req() req, @Res() res) {
    console.log('🎯 Callback route hit');
    console.log('👤 req.user:', req.user); // Should NOT be undefined

    if (!req.user) {
      return res.status(400).send('User not authenticated');
    }

    const response = await this.authService.loginWithGoogle(req.user.sub);
    return res.redirect(
      `https://practicing-x8va.onrender.com?token=${response.access_token}`,
    );
  }
}
