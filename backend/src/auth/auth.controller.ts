import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dtos/create-user.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserDto } from '../users/dtos/current-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SetTokensInterceptor } from './interceptors/set-tokens.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseInterceptors(SetTokensInterceptor)
  async login(@Body() user: LoginDto) {
    const { accessToken, refreshToken } = await this.authService.login(user);

    return { accessToken, refreshToken, message: 'Login successful' };
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(SetTokensInterceptor)
  async refresh(@CurrentUser() user: CurrentUserDto) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      user.id,
      user.email,
    );

    return { accessToken, refreshToken, message: 'Tokens refreshed' };
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(SetTokensInterceptor)
  async logout(@CurrentUser() user: CurrentUserDto) {
    await this.authService.logout(user.id);

    return { message: 'Logout successful' };
  }
}
