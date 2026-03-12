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
    await this.exerciseRepo.findIfExists(
      exercise.exerciseName,
      exercise.categoryId,
    );

    return this.exerciseRepo.create(exercise);
  }

  async findAll(): Promise<Exercise[]> {
    return this.exerciseRepo.findAll();
  }

  async findByName(name: string): Promise<Exercise> {
    const exercise = await this.exerciseRepo.findByName(name);

    if (!exercise) {
      throw new NotFoundException();
    }

    return exercise;
  }

  async findByCompleted(isCompleted: boolean): Promise<Exercise[]> {
    return this.exerciseRepo.findByCompleted(isCompleted);
  }

  async findIfExists(name: string, categoryId: string): Promise<null> {
    const exercise = await this.exerciseRepo.findIfExists(name, categoryId);

    if (exercise) {
      throw new ConflictException();
    }

    return exercise;
  }

  async update(
    name: string,
    {
      categoryId,
      exerciseName,
      description,
      series,
      repetitions,
      restTime,
      isCompleted,
    }: UpdateExerciseInput,
  ): Promise<Exercise> {
    await this.exerciseRepo.findByName(name);

    const exercise = {
      exerciseName: exerciseName ? exerciseName : name,
      categoryId: categoryId,
      description: description !== undefined ? description : null,
      series: series !== undefined ? series : null,
      repetitions: repetitions !== undefined ? repetitions : null,
      restTime: restTime !== undefined ? restTime : null,
      isCompleted: isCompleted ?? false,
    };

    return this.exerciseRepo.update(name, exercise);
  }

  async deleteByName(name: string): Promise<{ count: number }> {
    const isDeleted = await this.exerciseRepo.deleteByName(name);

    if (isDeleted.count === 0) {
      throw new NotFoundException();
    }

    return isDeleted;
  }
}
