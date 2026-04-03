import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    await this.usersService.updateRefreshToken(userId, refreshToken);
  }

  async refreshTokens(userId: string, email: string) {
    const { accessToken, refreshToken } = this.generateTokens(userId, email);
    await this.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async register({ name, email, password }: RegisterDto) {
    return this.usersService.create({ name, email, password });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken } = this.generateTokens(
      user.id,
      user.email,
    );
    await this.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
  }
}
