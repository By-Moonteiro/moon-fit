import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TrainingSheetModule } from './training_sheet/training_sheet.module';
import { TrainingCategoryModule } from './training_category/training_category.module';
import { ExerciseModule } from './exercise/exercise.module';
import { envValidationSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    UsersModule,
    AuthModule,
    TrainingSheetModule,
    TrainingCategoryModule,
    ExerciseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
