import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
