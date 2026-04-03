import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDTO } from './dtos/create-exercise.dto';
import { UpdateExerciseDTO } from './dtos/update-exercise.dto';
import { GetExercisesFilterDTO } from './dtos/get-exercise.dto';

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

  @Get()
  async findExerciseQuery(@Query() query: GetExercisesFilterDTO) {
    return this.exerciseService.findExerciseQuery(query);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() exercise: UpdateExerciseDTO,
  ) {
    return this.exerciseService.update(name, exercise);
  }

  @Delete(':name')
  @HttpCode(204)
  async delete(@Param('name') name: string) {
    return this.exerciseService.deleteByName(name);
  }
}
