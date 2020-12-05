import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciceCategoryDto } from './create-exercice-category.dto';

export class UpdateExerciceCategoryDto extends PartialType(CreateExerciceCategoryDto) {}
