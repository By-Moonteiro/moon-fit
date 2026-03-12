import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaExerciseRepository } from './repositories/prisma-exercise.repository';
import { ExerciseRepository } from './repositories/exercise.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ExerciseService,
    {
      provide: ExerciseRepository,
      useClass: PrismaExerciseRepository,
    },
  ],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
