import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDTO {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || undefined)
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || undefined)
  description?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || undefined)
  muscleGroup?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || undefined)
  executionMediaUrl?: string;
}
