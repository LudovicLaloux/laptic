import { IsNotEmpty, IsISO8601, IsString, IsInt } from "class-validator"
import { WorkoutCategory } from "../../workout-categories/entities/workout-category.entity"

export class CreateWorkoutDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsInt()
    categoryId: WorkoutCategory

    @IsNotEmpty()
    @IsISO8601()
    date: string
}
