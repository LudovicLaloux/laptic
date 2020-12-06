import { IsNotEmpty, IsInt, IsString } from "class-validator"
import { Workout } from "src/workouts/entities/workout.entity"
import { Exercice } from "src/exercices/entities/exercice.entity"

export class CreateSeriesDto {
    @IsNotEmpty()
    @IsInt()
    restTime: number

    @IsNotEmpty()
    @IsInt()
    order: number

    @IsNotEmpty()
    @IsInt()
    repNumber: number

    @IsNotEmpty()
    @IsString()
    repTime: string

    @IsNotEmpty()
    @IsInt()
    workoutId: Workout

    @IsNotEmpty()
    @IsInt()
    exerciceId: Exercice
}
