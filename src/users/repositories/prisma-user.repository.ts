import { PrismaService } from '@/prisma/prisma.service';
import { type UsersRepository } from './users.repository';
import {
  type UserResponse,
  type User,
  type UpdateUserData,
  type CreateUserData,
} from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(userId: string): Promise<UserResponse | null> {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: userId },
    });
  }

  async create({
    name,
    email,
    password,
  }: CreateUserData): Promise<UserResponse> {
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
        password,
      },
    });
  }

  async update(
    userEmail: string,
    { name, email, password }: UpdateUserData,
  ): Promise<UserResponse> {
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
        name,
        email,
        password,
      },
    });
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.deleteMany({
      where: { id: userId },
    });
  }
}
