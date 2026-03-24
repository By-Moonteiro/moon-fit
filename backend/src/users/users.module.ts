import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersController } from './users.controller';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
