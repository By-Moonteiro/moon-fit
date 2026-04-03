import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserData, UpdateUserInput } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly userRepo: UsersRepository,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(userId: string) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create({ name, email, password }: CreateUserData) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepo.create({ email, password: hashedPassword, name });
  }

  async update(userEmail: string, { name, email, password }: UpdateUserInput) {
    const existingUser = await this.userRepo.findByEmail(userEmail);

    if (!existingUser) throw new NotFoundException();

    if (email && email !== existingUser.email) {
      const emailInUse = await this.userRepo.findByEmail(email);

      if (emailInUse) throw new ConflictException();
    }

    const data = {
      email: email !== undefined ? email : existingUser.email,
      password:
        password !== undefined
          ? await bcrypt.hash(password, 10)
          : existingUser.password,
      name: name !== undefined ? name : existingUser.name,
    };

    return this.userRepo.update(userEmail, data);
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    await this.findById(userId);

    return this.userRepo.updateRefreshToken(userId, refreshToken);
  }

  async delete(userId: string) {
    const existingUser = await this.userRepo.findById(userId);

    if (!existingUser) throw new NotFoundException();

    return this.userRepo.delete(userId);
  }
}
