import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateExerciseDTO {
  @IsString()
  @IsNotEmpty()
  exerciseName!: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;

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
  @MinLength(0)
  restTime?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
