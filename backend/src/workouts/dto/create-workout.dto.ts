import { IsNotEmpty, IsISO8601, IsString, IsInt } from "class-validator"

export class CreateWorkoutDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsInt()
    categoryId: number

    @IsNotEmpty()
    @IsISO8601()
    date: string
}
