import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || undefined)
  name?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value || undefined)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value || undefined)
  password?: string;
}
