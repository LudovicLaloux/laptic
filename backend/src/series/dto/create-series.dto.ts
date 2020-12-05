import { IsNotEmpty, IsInt } from "class-validator"
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
    workoutId: Workout

    @IsNotEmpty()
    @IsInt()
    exerciceId: Exercice
}
