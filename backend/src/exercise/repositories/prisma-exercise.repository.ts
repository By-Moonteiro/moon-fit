import { PrismaService } from '@/prisma/prisma.service';
import type {
  Exercise,
  CreateExerciseInput,
  UpdateExerciseInput,
} from '../entities/exercise.entity';
import type { ExerciseRepository } from './exercise.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaExerciseRepository implements ExerciseRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(exercise: CreateExerciseInput): Promise<Exercise> {
    return this.prisma.exercise.create({
      data: exercise,
    });
  }

  async findAll(): Promise<Exercise[]> {
    return this.prisma.exercise.findMany();
  }

  async findByName(name: string): Promise<Exercise | null> {
    return this.prisma.exercise.findUnique({
      where: { exerciseName: name },
    });
  }

  async findByCompleted(isCompleted: boolean): Promise<Exercise[]> {
    return this.prisma.exercise.findMany({
      where: { isCompleted },
    });
  }

  async findIfExists(
    name: string,
    categoryId: string,
  ): Promise<Exercise | null> {
    return this.prisma.exercise.findFirst({
      where: { exerciseName: name, categoryId },
    });
  }

  async update(name: string, exercise: UpdateExerciseInput): Promise<Exercise> {
    return this.prisma.exercise.update({
      where: { exerciseName: name },
      data: { ...exercise },
    });
  }

  async deleteByName(name: string): Promise<{ count: number }> {
    return this.prisma.exercise.deleteMany({
      where: { exerciseName: name },
    });
  }
}
