import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CurrentUserDto {
  @IsOptional()
  @IsString()
  id!: string;

  @IsOptional()
  @IsEmail()
  email!: string;
}
