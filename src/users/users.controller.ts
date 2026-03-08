import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUserDto } from './dtos/current-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findById(@CurrentUser() user: CurrentUserDto) {
    return this.usersService.findById(user.id);
  }

  @Patch('edit')
  async update(
    @CurrentUser() user: CurrentUserDto,
    @Body() info: UpdateUserDto,
  ) {
    return this.usersService.update(user.email, info);
  }
}
