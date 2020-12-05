import { IsNotEmpty, IsString } from "class-validator"

export class CreateWorkoutCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
