import type {
  Exercise,
  CreateExerciseInput,
  UpdateExerciseInput,
} from '../entities/exercise.entity';

export abstract class ExerciseRepository {
  abstract create(exercise: CreateExerciseInput): Promise<Exercise>;
  abstract findAll(): Promise<Exercise[]>;
  abstract findByName(name: string): Promise<Exercise | null>;
  abstract findByCompleted(isCompleted: boolean): Promise<Exercise[]>;
  abstract findIfExists(
    name: string,
    categoryId: string,
  ): Promise<Exercise | null>;
  abstract update(
    name: string,
    exercise: UpdateExerciseInput,
  ): Promise<Exercise>;
  abstract deleteByName(name: string): Promise<{ count: number }>;
}
