export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserResponse = Omit<User, 'password'>;

export interface UpdateUserInput {
  name?: string | null;
  email?: string;
  password?: string;
}

export interface UpdateUserData {
  name: string | null;
  email: string;
  password: string;
}

export interface CreateUserData {
  name?: string | null;
  email: string;
  password: string;
}
