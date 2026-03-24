import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseBoolPipe,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDTO } from './dtos/create-exercise.dto';
import { UpdateExerciseDTO } from './dtos/update-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  async create(@Body() exercise: CreateExerciseDTO) {
    return this.exerciseService.create(exercise);
  }

  @Get()
  async findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.exerciseService.findByName(name);
  }

  @Get('completed/:isCompleted')
  async findByCompleted(
    @Param('isCompleted', ParseBoolPipe) isCompleted: boolean,
  ) {
    return this.exerciseService.findByCompleted(isCompleted);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() exercise: UpdateExerciseDTO,
  ) {
    return this.exerciseService.update(name, exercise);
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    return this.exerciseService.deleteByName(name);
  }
}
