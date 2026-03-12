import { IsNotEmpty, IsString } from 'class-validator';

export class FindIfExistsDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;
}
