import {
  type UserResponse,
  type User,
  type UpdateUserData,
  type CreateUserData,
} from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;

  abstract findById(userId: string): Promise<UserResponse | null>;

  abstract create({
    name,
    email,
    password,
  }: CreateUserData): Promise<UserResponse>;

  abstract update(
    userEmail: string,
    { name, email, password }: UpdateUserData,
  ): Promise<UserResponse>;

  abstract updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void>;

  abstract delete(userId: string): Promise<void>;
}
