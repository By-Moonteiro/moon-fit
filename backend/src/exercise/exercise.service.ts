import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExerciseRepository } from './repositories/exercise.repository';
import {
  CreateExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @Inject(ExerciseRepository)
    private readonly exerciseRepo: ExerciseRepository,
  ) {}

  async create(exercise: CreateExerciseInput): Promise<Exercise> {
    await this.findIfExists(exercise.name, exercise.muscleGroup);

    const exerciseToCreate = {
      ...exercise,
      description:
        exercise.description !== undefined ? exercise.description : null,
    };

    return this.exerciseRepo.create(exerciseToCreate);
  }

  async findIfExists(
    name: string,
    muscleGroup: string,
  ): Promise<Exercise | null> {
    const existing = await this.exerciseRepo.findIfExists(name, muscleGroup);

    if (existing) {
      throw new ConflictException();
    }

    return null;
  }

  async findAll(query?: {
    name?: string;
    muscleGroup?: string;
  }): Promise<Exercise[]> {
    const hasFilters =
      query && Object.values(query).some((v) => v !== undefined);

    if (hasFilters) {
      return this.exerciseRepo.findExerciseQuery(query);
    }

    return this.exerciseRepo.findAll();
  }

  async findByName(name: string): Promise<Exercise> {
    const exercise = await this.exerciseRepo.findByName(name);

    if (!exercise) {
      throw new NotFoundException();
    }
    return exercise;
  }

  async update(
    exerciseName: string,
    { name, description, muscleGroup, executionMediaUrl }: UpdateExerciseInput,
  ): Promise<Exercise> {
    const existing = await this.findByName(exerciseName);

    const exercise = {
      name: name !== undefined ? name : exerciseName,
      description:
        description !== undefined ? description : existing.description,
      muscleGroup:
        muscleGroup !== undefined ? muscleGroup : existing.muscleGroup,
      executionMediaUrl:
        executionMediaUrl !== undefined
          ? executionMediaUrl
          : existing.executionMediaUrl,
    };

    return this.exerciseRepo.update(exerciseName, exercise);
  }

  async deleteByName(name: string): Promise<{ count: number }> {
    const isDeleted = await this.exerciseRepo.deleteByName(name);

    if (isDeleted.count === 0) {
      throw new NotFoundException();
    }

    return isDeleted;
  }
}
