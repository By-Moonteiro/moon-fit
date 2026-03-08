import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create({ name, email, password }: RegisterDto) {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async update(userEmail: string, { name, email, password }: UpdateUserDto) {
    const existingUser = await this.findByEmail(userEmail);

    if (!existingUser) throw new NotFoundException();

    if (email && email !== existingUser.email) {
      const emailInUse = await this.findByEmail(email);

      if (emailInUse) throw new ConflictException();
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : existingUser.password;

    return this.prisma.user.update({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { email: userEmail },
      data: {
        name: name ?? existingUser.name,
        email: email ?? existingUser.email,
        password: hashedPassword,
      },
    });
  }
}
