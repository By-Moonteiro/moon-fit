import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  muscleGroup!: string;

  @IsOptional()
  @IsString()
  executionMediaUrl!: string;
}
