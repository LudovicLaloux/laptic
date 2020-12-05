import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator"
import { ExerciceCategory } from "../../exercice-categories/entities/exercice-category.entity"

export class CreateExerciceDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    equipements: string

    @IsNotEmpty()
    @IsInt()
    categoryId: ExerciceCategory
}
