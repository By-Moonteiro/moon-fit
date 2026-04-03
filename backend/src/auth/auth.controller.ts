import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dtos/create-user.dto';
import type { Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserDto } from '../users/dtos/current-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() user: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(user);

    this.setCookies(res, accessToken, refreshToken);

    return res.json({ message: 'Login successful' });
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  async refresh(@CurrentUser() user: CurrentUserDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      user.id,
      user.email,
    );

    this.setCookies(res, accessToken, refreshToken);

    return res.json({ message: 'Tokens refreshed' });
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: CurrentUserDto, @Res() res: Response) {
    await this.authService.logout(user.id);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.json({ message: 'Logout successful' });
  }

  // método privado pra não repetir a lógica de setar cookies
  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    res.cookie('access_token', accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutos em ms
    });

    res.cookie('refresh_token', refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em ms
    });
  }
}
