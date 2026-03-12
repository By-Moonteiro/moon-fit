import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateExerciseDTO {
  @IsOptional()
  @IsString()
  exerciseName?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  series?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  repetitions?: number;

  @IsOptional()
  @IsString()
  restTime?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
