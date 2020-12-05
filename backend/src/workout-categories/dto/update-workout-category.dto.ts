import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutCategoryDto } from './create-workout-category.dto';

export class UpdateWorkoutCategoryDto extends PartialType(CreateWorkoutCategoryDto) {}
